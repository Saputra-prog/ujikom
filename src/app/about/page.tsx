import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="min-h-screen bg-[#4DA1A9]">
      <div className="flex justify-center pt-20">
        <Image
          src="/img/y.png"
          width={300}
          height={300}
          alt="logo"
          className="rounded-lg"
        />
      </div>
      <div className="flex text-justify ml-56 mr-56 mt-5">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum,
          nostrum modi alias ad, totam nihil facere perspiciatis reprehenderit
          dolore autem veniam! Delectus incidunt mollitia recusandae ab
          architecto, id ipsam est?
        </p>
      </div>
    </div>
  );
}

export default page;
