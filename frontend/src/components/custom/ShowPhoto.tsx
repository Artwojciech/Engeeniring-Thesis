import { useEffect, useState, useRef } from "react";
import type { Photo } from "@/services/gallery";
import { useAuth } from "@/hooks/useAuth";
import { updatePhoto, deletePhoto } from "@/services/gallery";
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
import { addFavourite, deleteFavourite, isFavourite as isFavouriteMethod } from "@/services/favourites";
import { toast } from "sonner";

interface ShowPhotoProps {
  photo: Photo;
  children: React.ReactNode;
  onFavouritesChange?: () => void;
  deleted?: () => void;
}

export default function ShowPhoto({ photo, children, onFavouritesChange, deleted }: ShowPhotoProps) {
  const { user } = useAuth();
  const isAdmin = !!user?.is_admin;

  const [open, setOpen] = useState(false);

  const [backendTitle, setBackendTitle] = useState<string>(photo.title || "");
  const [tempTitle, setTempTitle] = useState<string>(photo.title || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isFavourite, setIsFavourite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [changedFavourite, setChangedFavourite] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const [imgWidth, setImgWidth] = useState(0);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = photo.title || "";
    setBackendTitle(t);
    setTempTitle(t);
    setIsEditing(false);
  }, [photo.id, photo.title]);

  useEffect(() => {
    let active = true;
    if (open && user) {
      isFavouriteMethod(photo.id)
        .then((res) => {
          if (active) setIsFavourite(res);
        })
        .catch((err) =>
          console.error("Failed to fetch favourite status", err)
        );
    }
    return () => {
      active = false;
    };
  }, [photo.id, user, open]);

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
      setChangedFavourite(true);
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

  const handleOpenChange = (openState: boolean) => {
    if (openState) {
      setChangedFavourite(false);
    } else {
      if (changedFavourite) {
        onFavouritesChange?.();
      }
    }
    setOpen(openState);
  };

  const handleDeletePhoto = async () => {
    try {
      setDeleting(true);
      await deletePhoto(photo.id);
      toast.success("Photo was deleted");
      setDeleteDialogOpen(false);
      setOpen(false);
      deleted?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete photo");
    } finally {
      setDeleting(false);
    }
  };

  const showTitleBlock = isAdmin || Boolean(backendTitle.trim());

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}> 
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="w-auto max-h-[90vh] p-0 bg-transparent border-none shadow-none flex flex-col items-center gap-0 overflow-auto [&>button:first-of-type]:hidden"
        style={{ maxWidth: "60vw" }}
      >
        <div className="relative inline-block ">
          <div className="relative">
            <img
              ref={imgRef}
              src={`http://localhost:4000/${photo.filename}`}
              alt={backendTitle || "photo"}
              className="block max-w-[60vw] max-h-[85vh] object-contain"
              draggable={false}
              onLoad={() => {
                if (imgRef.current) setImgWidth(imgRef.current.offsetWidth);
              }}
            />
            {photo.category && (
              <div className="absolute top-0 left-0 bg-homeside/50 border-r-2 border-b-2 border-footerbg px-1 py-1 flex items-start justify-center"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                    zIndex: 20,
                  }}
              >
                <p className="text-sm font-aboutfont text-footerbg m-0" >
                  {photo.category.name}
                </p>
              </div>
            )}

            <button
              onClick={toggleFavourite}
              disabled={favLoading}
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
            <div className="relative w-full bg-homeside border-r-2 border-l-2 border-b-2  border-footerbg px-3 py-2 box-border" style={{ width: imgWidth }}>
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
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-footerbg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-aboutfont text-black m-0 break-words whitespace-pre-wrap">
                    {backendTitle.trim() ? backendTitle : "\u00A0"}
                  </h3>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setTempTitle(backendTitle);
                        setIsEditing(true);
                      }}
                      className="absolute top-2 right-2 ml-2 text-gray-600 hover:text-black cursor-pointer"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                  )}
                </>
              )}
            </div>
          )}
          {isAdmin && (
              <div className="flex justify-end">
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-red-900 text-homeside px-3 py-1 rounded hover:bg-red-950 cursor-pointer">
                      DELETE PHOTO
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[300px] p-4 flex flex-col gap-4 [&>button:first-of-type]:cursor-pointer">
                    <p className="text-black text-center">ARE YOU SURE YOU WANT TO DELETE THIS PHOTO?</p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setDeleteDialogOpen(false)}
                        className="px-5 py-1 border-2 rounded hover:bg-gray-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeletePhoto}
                        disabled={deleting}
                        className="px-5 py-1 bg-red-900 text-white rounded hover:bg-red-950 cursor-pointer"
                      >
                        Yes
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
