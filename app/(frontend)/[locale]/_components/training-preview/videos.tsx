const sources = [
  "/videos/preview-1.MP4",
  "/videos/preview-2.MP4",
  "/videos/preview-3.MP4",
  "/videos/preview-4.MP4",
];

export const Videos = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-between gap-y-4">
      {sources.map((source, index) => (
        <div key={index} className="md:w-[49%] lg:w-[24%] h-[480px] relative">
          <video
            className="object-cover absolute size-full rounded-3xl"
            autoPlay
            loop
            muted
          >
            <source src={source} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};
