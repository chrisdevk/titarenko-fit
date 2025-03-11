import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface TrainingModalProps {
  open: boolean;
  onClose: () => void;
}

export const TrainingModal = ({ onClose, open }: TrainingModalProps) => {
  const t = useTranslations("HomePage.hero");

  const params = useParams();
  const locale = params.locale;

  let videoId = locale === "ru" ? "874917554" : "875365587";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl !rounded-3xl">
        <DialogTitle>{t("button")}</DialogTitle>
        <iframe
          id="vimeo-player"
          src={`https://player.vimeo.com/video/${videoId}`}
          allow="fullscreen"
          className="aspect-video h-full w-full max-w-full flex-shrink-0 rounded-3xl"
          title="Test training"
        />
      </DialogContent>
    </Dialog>
  );
};
