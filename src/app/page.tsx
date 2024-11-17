import BottomBar from "@/components/layouts/BottomBar/BottomBar";
import Header from "@/components/layouts/Header/Header";
import CoffeeCategories from "@/components/template/CoffeeCategories/CoffeeCategories";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Header />
      <BottomBar />
      <Image className="mt-[95px]" width={1530} height={639} src='/images/background-home-page.webp' alt="Background page" />
      <CoffeeCategories />
    </>
  );
}
