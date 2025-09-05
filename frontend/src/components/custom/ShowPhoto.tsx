import { useEffect, useState } from "react";
import type { Photo } from "@/services/gallery";
import { useAuth } from "@/hooks/useAuth";
import { updatePhoto } from "@/services/gallery";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid"; 
import { addFavourite, deleteFavourite } from "@/services/favourites";

interface ShowPhotoProps {
  photo: Photo;
  children: React.ReactNode;
}

export default function ShowPhoto({ photo, children }: ShowPhotoProps) {
  const { user } = useAuth();
  const isAdmin = !!user?.is_admin;

  const [backendTitle, setBackendTitle] = useState<string>(photo.title || "");
  const [tempTitle, setTempTitle] = useState<string>(photo.title || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    const t = photo.title || "";
    setBackendTitle(t);
    setTempTitle(t);
    setIsEditing(false);
  }, [photo.id, photo.title]);

  const handleSave = async () => {
    const tempTrim = tempTitle.trim();
    if (tempTrim === backendTitle.trim()) {
      setIsEditing(false);
      return;
    }
    try {
      setLoading(true);
      const updated = await updatePhoto(photo.id, tempTrim);
      const next = (updated?.title ?? tempTrim) as string;
      setBackendTitle(next);
      setTempTitle(next);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update title", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = async () => {
    if (favLoading) return;
    try {
      setFavLoading(true);
      if (isFavourite) {
        await deleteFavourite(photo.id);
        setIsFavourite(false);
      } else {
        await addFavourite(photo.id);
        setIsFavourite(true);
      }
    } catch (err) {
      console.error("Failed to toggle favourite", err);
    } finally {
      setFavLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempTitle(backendTitle);
  };

  const showTitleBlock = isAdmin || Boolean(backendTitle.trim());

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="w-auto max-h-[95vh] p-0 bg-transparent border-none shadow-none flex flex-col items-center gap-0 overflow-auto [&>button:first-of-type]:hidden"
      >
        <div className="relative inline-block ">
          <div className="relative">
            <img
              src={`http://localhost:4000/${photo.filename}`}
              alt={backendTitle || "photo"}
              className="block w-full h-auto max-h-[90vh] object-contain"
              draggable={false}
            />
            <button
              onClick={toggleFavourite}
              disabled={favLoading}
              aria-label="Toggle favourite"
              className={`cursor-pointer absolute bottom-2 right-2 z-30 p-2 rounded-full transition focus:outline-none focus:ring-0 ${
                isFavourite ? "bg-red-900 hover:bg-red-950" : "bg-black/70 hover:bg-black"
              }`}
            >
              <HeartIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          <DialogClose className="absolute top-0 right-0 p-1 bg-footerbg/50 hover:bg-footerbg/70 transition cursor-pointer focus:outline-none focus:ring-0">
            <XMarkIcon className="w-5 h-5 text-white" />
          </DialogClose>

          {showTitleBlock && (
            <div className="relative w-full bg-white border-2 border-footerbg px-3 py-2 box-border">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="border rounded px-2 py-1 text-sm flex-1 min-w-0"
                    disabled={loading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                      if (e.key === "Escape") handleCancel();
                    }}
                  />
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="text-footerbg disabled:opacity-50"
                    aria-label="Zapisz tytuł"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-footerbg"
                    aria-label="Anuluj edycję"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-black m-0 break-words whitespace-pre-wrap">
                    {backendTitle.trim() ? backendTitle : "\u00A0"}
                  </h3>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setTempTitle(backendTitle);
                        setIsEditing(true);
                      }}
                      className="absolute top-2 right-2 ml-2 text-gray-600 hover:text-black"
                      aria-label="Edytuj tytuł"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {photo.category && (
            <div className="w-full bg-white border-2 border-footerbg px-3 py-1 box-border">
              <p className="text-sm text-black m-0 break-words whitespace-pre-wrap">
                {photo.category.name}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
