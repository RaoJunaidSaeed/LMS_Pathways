'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

function getSupportedMimeType() {
  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return '';
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function VideoRecorder({ onRecordingComplete }) {
  const [mode, setMode] = useState(null); // 'webcam' | 'screen'
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [duration, setDuration] = useState(0);

  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const liveVideoRef = useRef(null);
  const previewVideoRef = useRef(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startStream = async (type) => {
    cleanup();
    setRecordedBlob(null);
    setPreviewUrl(null);
    setDuration(0);
    chunksRef.current = [];

    try {
      let stream;
      if (type === 'webcam') {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } else {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: { displaySurface: 'monitor' },
          preferCurrentTab: false,
        });
        // Try to add microphone audio
        let audioStream = null;
        try {
          audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
        } catch {
          // Mic not available — record screen without audio
        }
        const tracks = [...screenStream.getTracks()];
        if (audioStream) {
          tracks.push(...audioStream.getAudioTracks());
        }
        stream = new MediaStream(tracks);

        // Handle browser's native "Stop sharing" button
        screenStream.getVideoTracks()[0].onended = () => {
          stopRecording();
        };
      }

      streamRef.current = stream;
      setMode(type);

      // Attach live preview
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        toast.error(
          type === 'webcam'
            ? 'Camera access denied. Please allow camera permissions.'
            : 'Screen share was cancelled.'
        );
      } else {
        toast.error('Could not access media device.');
      }
      setMode(null);
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    const mimeType = getSupportedMimeType();
    const recorder = new MediaRecorder(
      streamRef.current,
      mimeType ? { mimeType } : undefined
    );
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const mType = mimeType || 'video/webm';
      const blob = new Blob(chunksRef.current, { type: mType });
      const url = URL.createObjectURL(blob);
      setRecordedBlob(blob);
      setPreviewUrl(url);
      setRecording(false);

      // Stop all tracks after recording ends
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };

    recorderRef.current = recorder;
    recorder.start(1000); // 1s chunks
    setRecording(true);
    setDuration(0);

    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
  };

  const reRecord = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setRecordedBlob(null);
    setPreviewUrl(null);
    setDuration(0);
    setMode(null);
  };

  const useRecording = () => {
    if (recordedBlob && onRecordingComplete) {
      onRecordingComplete(recordedBlob);
    }
  };

  // No mode selected — show source picker
  if (!mode && !recordedBlob) {
    return (
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => startStream('webcam')}
          className="flex-1 py-3 px-4 rounded-md bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 transition text-sm font-medium"
        >
          Webcam
        </button>
        <button
          type="button"
          onClick={() => startStream('screen')}
          className="flex-1 py-3 px-4 rounded-md bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 transition text-sm font-medium"
        >
          Screen Recording
        </button>
      </div>
    );
  }

  // Preview recorded video
  if (recordedBlob && previewUrl) {
    return (
      <div className="space-y-3">
        <video
          ref={previewVideoRef}
          src={previewUrl}
          controls
          className="w-full aspect-video rounded-md bg-black"
        />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reRecord}
            className="flex-1 py-2 px-4 rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600 transition text-sm font-medium"
          >
            Re-record
          </button>
          <button
            type="button"
            onClick={useRecording}
            className="flex-1 py-2 px-4 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition text-sm font-medium"
          >
            Use this recording
          </button>
        </div>
      </div>
    );
  }

  // Live preview + recording controls
  return (
    <div className="space-y-3">
      <video
        ref={(el) => {
          liveVideoRef.current = el;
          if (el && streamRef.current) {
            el.srcObject = streamRef.current;
          }
        }}
        autoPlay
        muted
        playsInline
        className="w-full aspect-video rounded-md bg-black"
      />
      <div className="flex items-center gap-3">
        {!recording ? (
          <button
            type="button"
            onClick={startRecording}
            className="py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-sm font-medium"
          >
            Start Recording
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={stopRecording}
              className="py-2 px-4 rounded-md bg-red-600 text-white hover:bg-red-700 transition text-sm font-medium"
            >
              Stop Recording
            </button>
            <span className="text-sm text-slate-300 font-mono tabular-nums">
              {formatTime(duration)}
            </span>
          </>
        )}
        <button
          type="button"
          onClick={() => {
            cleanup();
            setMode(null);
            setRecording(false);
            setDuration(0);
          }}
          className="ml-auto text-sm text-slate-400 hover:text-slate-200 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
