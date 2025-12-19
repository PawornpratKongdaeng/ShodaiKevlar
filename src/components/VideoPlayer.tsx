'use client'

import React from 'react'

// 1. Helper Function สำหรับดึง ID จากลิงก์ YouTube
// รองรับทั้งแบบ https://www.youtube.com/watch?v=... และ https://youtu.be/...
const getYouTubeID = (url: string | null | undefined): string | null => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

interface VideoPlayerProps {
  videoData: any // รับข้อมูลวิดีโอจาก Payload (SiteVideos Global)
}

export const VideoPlayer = ({ videoData }: VideoPlayerProps) => {
  if (!videoData) return null

  const { title, videoType, youtubeUrl, videoFile } = videoData

  // ==========================================
  // CASE 1: YouTube Video
  // ==========================================
  if (videoType === 'youtube' && youtubeUrl) {
    const videoId = getYouTubeID(youtubeUrl)
    
    // ถ้าลิงก์ผิด หรือหา ID ไม่เจอ ให้ไม่แสดงผล
    if (!videoId) return null

    return (
      <div className="flex flex-col gap-3 h-full">
        {/* Aspect Ratio 16:9 Container */}
        <div className="relative w-full pt-[56.25%] bg-black rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-red-600/50 transition-colors duration-500">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`} 
            title={title || 'YouTube video player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        
        {/* Title (ถ้ามี) */}
        {title && (
          <h3 className="text-white text-lg font-bold uppercase tracking-wider pl-1 border-l-4 border-red-600">
            {title}
          </h3>
        )}
      </div>
    )
  }

  // ==========================================
  // CASE 2: Uploaded File (MP4)
  // ==========================================
  if (videoType === 'upload' && videoFile?.url) {
    return (
      <div className="flex flex-col gap-3 h-full">
        <div className="relative w-full bg-black rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-red-600/50 transition-colors duration-500">
          <video 
            controls 
            playsInline
            className="w-full h-auto block aspect-video object-cover"
            poster={videoFile.thumbnailURL} // ถ้า Payload Gen thumbnail ให้
          >
            <source src={videoFile.url} type={videoFile.mimeType || 'video/mp4'} />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Title (ถ้ามี) */}
        {title && (
          <h3 className="text-white text-lg font-bold uppercase tracking-wider pl-1 border-l-4 border-red-600">
            {title}
          </h3>
        )}
      </div>
    )
  }

  // กรณีไม่มีข้อมูลวิดีโอ
  return null
}