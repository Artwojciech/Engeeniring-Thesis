import { useState, useEffect, useCallback } from "react";
import { getPhotosByCategory } from "@/services/gallery";
import type { Photo } from "@/services/gallery";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import ShowPhoto from "@/components/custom/ShowPhoto";

export default function GalleryPage() {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category") || "";

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = useCallback(async (page: number) => {
    if (!categoryName) return;
    setLoading(true);
    try {
      const result = await getPhotosByCategory(categoryName, undefined, page, 20);
      setPhotos(result.photos);
      setTotalPages(result.totalPages);
      setCurrentPage(result.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [categoryName]);

  useEffect(() => {
    fetchPhotos(1);
  }, [fetchPhotos]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchPhotos(newPage);
  };

  const renderPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col w-full pb-4 bg-homeside" >
      <section className="w-full bg-aboutpages text-center py-14 px-6 relative z-5 shadow-[0_-12px_15px_rgba(0,0,0,0.10),0_12px_25px_rgba(0,0,0,0.20)] min-h-[200px] flex items-center justify-center mb-8">
        <h1 className="text-3xl md:text-4xl font-aboutfont font-bold text-footerbg">
          {categoryName.toUpperCase()}
        </h1>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="px-2 md:px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <ShowPhoto key={photo.id} photo={photo}>
                <div className="relative w-full h-40 rounded overflow-hidden border cursor-pointer">
                  <img
                    src={`http://localhost:4000/${photo.filename}`}
                    alt={photo.title || "photo"}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
              </ShowPhoto>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent className="font-merri">
                <PaginationItem>
                  <PaginationPrevious
                    href={currentPage === 1 ? undefined : "#"}
                    onClick={() => {
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                  >
                    Prev
                  </PaginationPrevious>
                </PaginationItem>

                {renderPages().map((page, idx) => (
                  <PaginationItem key={idx}>
                    {page === "..." ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={() => handlePageChange(Number(page))}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href={currentPage === totalPages ? undefined : "#"}
                    onClick={() => {
                      if (currentPage < totalPages) handlePageChange(currentPage + 1);
                    }}
                  >
                    Next
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}
