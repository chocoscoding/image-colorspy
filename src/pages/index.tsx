import Head from "next/head";
import styles from "@/styles/Home.module.css";
import DisplayImage from "@/Components/DisplayImage";
import ColorThief from "colorthief";
import { useState } from "react";

const gallery = <i className="fas fa-images"></i>;

export default function Home() {
  //state
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [colorPalette, setColorPalette] = useState<any[]>([]);

  //functions
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const img = new Image();

      // Wait for image to load
      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 6);
        setUploadedImage(event.target?.result as string);
        setColorPalette(colorPalette || []);
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file as Blob);
  };

  return (
    <>
      <Head>
        <title>Image Color Spy</title>
        <meta
          name="description"
          content="Get all colors from an image"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <header>
        <h1>Image colorspy</h1>

        <div className="input">
          <label htmlFor="file">{gallery} Upload Image</label>
          <input
            type="file"
            id="file"
            hidden
            onChange={uploadImage}
          />
        </div>
      </header>

      <main className={styles.main}>
        <DisplayImage
          uploadedImage={uploadedImage}
          colorPalette={colorPalette}
        />
      </main>
    </>
  );
}
