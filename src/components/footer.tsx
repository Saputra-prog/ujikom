import React from "react";
import Image from "next/image";

function footer() {
  return (
    <div className="px-14 py-4 bg-[#2E5077] grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="grid grid-rows-2">
        <div className="flex justify-center mb-3">
          <Image
            src="/img/psj.png"
            className="rounded-lg"
            width={125}
            height={85}
            alt="logo"
          />
        </div>
        <p className="text-justify text-white">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
          reprehenderit sit consequuntur quae eveniet dolor! Iure animi ad
          itaque. Labore quasi dolores exercitationem quo minima, atque nihil
          animi enim inventore.
        </p>
      </div>
      <div className="grid grid-rows-2">
        <div></div>
        <div className="flex flex-col ml-5 text-white">
          <span>Nama :</span>
          <span>No Telepon :</span>
          <span>Alamat :</span>
          <span>Email :</span>
          <span>identitas caffe :</span>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <Image
          src="/img/psj.png"
          className="rounded-lg flex justify-center items-center mt-10"
          width={200}
          height={300}
          alt="logo"
        />
        <div className="flex flex-col space-y-2 mt-10 ml-4">
          <Image
            src="/img/psj.png"
            className="rounded-lg"
            width={45}
            height={45}
            alt="logo"
          />
          <Image
            src="/img/psj.png"
            className="rounded-lg"
            width={45}
            height={45}
            alt="logo"
          />
          <Image
            src="/img/psj.png"
            className="rounded-lg"
            width={45}
            height={45}
            alt="logo"
          />
          <Image
            src="/img/psj.png"
            className="rounded-lg"
            width={45}
            height={45}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default footer;
