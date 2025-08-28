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
        <div className="text-footerbg text-base lg:text-lg font-merri font-light leading-relaxed max-w-3xl 2xl:max-w-2xl mx-auto">
          <p className="mb-6">
          Hi, my name is Artur and I have been doing photography for over five years now. I come from Poland 
          and currently live in Kraków. In my profession, I try to suit my photoshoots to my interests, 
          which makes me more passionate about doing my job and guarantees that I have a great knowledge 
          about the subject. 
          </p>
          <p>
          I have always been interested in fashion, I have watched fashion shows since middle school
          and clued-up on contemporary and vintage style. Thats why when it comes to personal shoots 
          I like the fashion ones the most and I would love to do one for you.
          I also specialise in basketball media coverage. I have trained basketball for nearly my whole life,
          I know this game inside out and have a high basketball savvy that allows me to capture intense shots that 
          other photographers would miss. For a while I was the main photographer of a couple of amateur basketball 
          leagues, covering not only the photos but also videos and social media content. The job gave me a lot 
          of experiance and confidence much needed in the industry. During my spare time I do street photography.
          Photographing people wrapped up in everydayness for me feels like a chance to make simplicity of life 
          immortal. I love to travel and am really curious about the world. I hope that my works show it.
          </p>
        </div>
      </section>
    </div>
  );
}
