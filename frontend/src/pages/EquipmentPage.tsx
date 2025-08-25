import eq1small from "@/assets/eq1small.png";
import eq1large from "@/assets/eq1large.png";
import eq2small from "@/assets/eq2small.png";
import eq2large from "@/assets/eq2large.png";
import eq3small from "@/assets/eq3small.png";
import eq3large from "@/assets/eq3large.png";

export default function EquipmentPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full bg-aboutpages text-center py-14 px-6 relative z-5 shadow-[0_-12px_15px_rgba(0,0,0,0.10),0_12px_25px_rgba(0,0,0,0.20)] ">
        <h1 className="text-3xl md:text-4xl font-aboutfont font-bold text-footerbg">EQUIPMENT</h1>
        <p className="text-sm md:text-base mt-6 text-footerbg font-merri">
          Although it's the photographer who takes the photo, everybody knows that gear matters. Beneath you have 
          the list of body and lens that I use. 
        </p>
      </section>

      <section className="w-full mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center bg-homeside">
        <div>
          <img
            src={eq1large}
            srcSet={`${eq1small} 1080w, ${eq1large} 1920w`}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt="Sprzęt 1"
            className="w-full h-auto object-contain rounded-md shadow-md"
          />
          <p className="mt-4 text-footerbg">AF-S DX NIKKOR 18-105mm f/3.5-5.6G ED VR</p>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center h-[500px] ">
            <img
              src={eq3large}
              srcSet={`${eq3small} 1080w, ${eq3large} 1920w`}
              sizes="(max-width: 768px) 100vw, 33vw"
              alt="Sprzęt 3"
              className="w-full h-auto object-contain rounded-md shadow-md"
            />
            <p className="mt-4 text-footerbg">Nikon D7100</p>
          </div>
        </div>
        <div>
          <img
            src={eq2large}
            srcSet={`${eq2small} 1080w, ${eq2large} 1920w`}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt="Sprzęt 2"
            className="w-full h-auto object-contain rounded-md shadow-md"
          />
          <p className="mt-4 text-footerbg">Sigma A 30 mm f/1.4 DC HSM</p>
        </div>
      </section>
    </div>
  );
}
