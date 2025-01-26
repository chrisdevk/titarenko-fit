const sources = [
  "/videos/preview-1.MP4",
  "/videos/preview-2.MP4",
  "/videos/preview-3.MP4",
  "/videos/preview-4.MP4",
];

export const Videos = () => {
  return (
    <div className="flex flex-col flex-wrap justify-between gap-y-4 md:flex-row">
      {sources.map((source, index) => (
        <div
          key={index}
          className="relative h-[280px] md:h-[480px] md:w-[49%] lg:w-[24%]"
        >
          <video
            className="absolute size-full rounded-3xl object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={source} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};
