import me2small from "@/assets/me2small.png";
import me2large from "@/assets/me2large.png";

export default function Contact() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full bg-aboutpages text-center py-14 px-6 relative z-5 shadow-[0_-12px_15px_rgba(0,0,0,0.10),0_12px_25px_rgba(0,0,0,0.20)] min-h-[200px] flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-aboutfont font-bold text-footerbg">
          CONTACT
        </h1>
      </section>
      <section className="w-full mx-auto py-14 px-8 flex flex-col md:flex-row items-center justify-center md:gap-x-20 gap-y-8 bg-homeside min-h-[76vh] md:min-h-[84vh]">
        <div className="flex justify-center">
          <img
            src={me2large}
            srcSet={`${me2small} 1080w, ${me2large} 1920w`}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Contact avatar"
            className="w-64 h-64 md:w-86 md:h-86 object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="text-footerbg text-base md:text-lg lg:text-xl 2xl:text-2xl font-merri leading-relaxed space-y-4">
          <p className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold">Artur Wojciechowski</p>
          <p className="underline">
            artwojciech@interia.pl
          </p>
          <p>+48 519 605 895</p>
          <a
            href="https://www.instagram.com/szklanebazgroly"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            @szklanebazgroly
          </a>
        </div>
      </section>
    </div>
  );
}
