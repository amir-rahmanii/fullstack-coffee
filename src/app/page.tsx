import BottomBar from "@/components/layouts/BottomBar/BottomBar";
import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";
import CoffeeCategoriesSlider from "@/components/template/CoffeeCategoriesSlider/CoffeeCategoriesSlider";
import MagazineSlider from "@/components/template/MagazineSlider/MagazineSlider";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Header />
      <BottomBar />
      {/* img */}
      <div className="flex items-center justify-center">
        <Image className="mt-[95px]" width={1530} height={639} src='/images/background-home-page.webp' alt="Background page" />
      </div>
      <CoffeeCategoriesSlider isAboutBonMano={false} />
      {/* video */}
      <div className="flex tems-center justify-center">
        <div className=" relative">
          <video className="w-full h-auto" autoPlay loop muted>
            <source src="/videos/clip.mp4" type="video/mp4" />
            مرورگر شما از این ویدیو پشتیبانی نمیکند
          </video>
          <div className="absolute top-[50%] -translate-y-[50%] md:px-20">
            <div className=" w-full flex flex-col justify-center items-center md:block md:w-[41%]">
              <h2 className="text-goldnes text-[24px] lg:text-[40px] pb-3 font-danaBold">راهنمای دم آوری قهوه</h2>
              <p className="text-background text-center md:text-right text-sm lg:text-base">
                برای علاقه‌مندان به قهوه که می‌خواهند فنجان قهوه بهتری را در خانه دم‌آوری کنند. باریستاهای ما، انواع روش‌ها با هر دم‌افزاری که فکرش را بکنید آموزش
                دادند تا یک قهوه باکیفیت دقیقا همان‌طوری که دوست دارید دم‌آوری کنید.
              </p>
              <Button variant="default" size="default" className="mt-5 bg-transparent text-background border border-background hover:bg-transparent hover:border-goldnes hover:text-goldnes">بیشتر ببینید</Button>
            </div>
          </div>
        </div>
      </div>
      <CoffeeCategoriesSlider isAboutBonMano={true} />
      <MagazineSlider />
      <Footer />
    </>
  );
}
