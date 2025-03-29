interface Props {
  data: any;
  primaryColor: string;
  bgColor: string;
  primaryFont: string;
  secondaryFont: string;
  tertiaryFont: string;
}

export default function FoodMenu({ data, primaryColor, bgColor, primaryFont, secondaryFont, tertiaryFont }: Props) {
  return (
    <div className="mx-auto px-8 py-12" style={{ backgroundColor: bgColor }}>
      <div className="text-left mb-6">
        {/* <h2 className="font-serif"> */}
          <h1 className="text-3xl italic" style={{color: primaryColor, fontFamily: primaryFont}}>
          {data.title.text}
        </h1>
          <span className={data.subtitle.className} style={{fontFamily:tertiaryFont}}>
            {data.subtitle.text}
          </span>
        {/* </h2> */}
      </div>

      {/* Menu Image Section */}
      <div className="relative h-[500px] w-full group">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${data.menuImage.src})`,
          }}
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="text-3xl md:text-5xl text-center mb-8 px-4" style={{fontFamily: primaryFont}}>
            {data.downloadText}
          </h3>
          <button
            className="bg-white text-gray-900 px-8 py-3 tracking-wider text-sm uppercase hover:bg-gray-100 transition-colors"
            style={{fontFamily: tertiaryFont}}
              onClick={() => {
              const pdfUrl = data.menuPdf.src;
              if (pdfUrl) {
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'menu.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }}
          >
            {data.downloadButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}