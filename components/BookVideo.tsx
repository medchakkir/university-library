"use client";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <video controls className="w-full rounded-xl">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BookVideo;
