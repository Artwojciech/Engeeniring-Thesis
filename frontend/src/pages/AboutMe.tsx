import me1small from "@/assets/me1small.png";
import me1large from "@/assets/me1large.png";

export default function AboutMe() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full bg-aboutpages text-center py-14 px-6 relative z-5 shadow-[0_-12px_15px_rgba(0,0,0,0.10),0_12px_25px_rgba(0,0,0,0.20)] min-h-[200px] flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-aboutfont font-bold text-footerbg">ABOUT ME</h1>
      </section>
      <section className="w-full mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-homeside">
        <div>
          <img
            src={me1large}
            srcSet={`${me1small} 1080w, ${me1large} 1920w`}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="About me photo"
            className="w-full h-auto object-contain rounded-md shadow-md"
          />
        </div>
        <div className="text-footerbg text-base md:text-lg font-merri leading-relaxed">
          dac tu ciekawy opis
        </div>
      </section>
    </div>
  );
}
