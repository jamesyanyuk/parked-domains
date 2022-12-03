import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "../util/classNames";

export default function Home({ domains }) {
  const [currentDomain, setCurrentDomain] = useState("...");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setCurrentDomain(window.location.hostname);
  }, [setCurrentDomain]);

  return (
    <div className="h-screen flex">
      <div className="fade p-[30px] sm:p-[120px] m-auto">
        <a
          href="https://yanyuk.com/"
          className="inline-block w-[100px] h-[42px] mb-[36px] mr-[18px] indent-[-9999px] bg-[url('/yanyuk.png')] bg-contain bg-left bg-no-repeat"
        >
          Yanyuk
        </a>
        <h1 className="mb-[7px] text-[13px] leading-[22px] font-normal">
          Parked Domain ({currentDomain})
        </h1>
        <p className="w-full max-w-[600px] mb-[22px] text-black/50">
          Inquire with offer via email.
          <br />
          {showMore ? (
            <span>
              More domains below.{" "}
              <a
                className="cursor-pointer relative text-black/50 no-underline transition-all duration-300 ease-in-out hover:text-[#086efa] after:content-[''] after:absolute after:-bottom-[4px] after:left-0 after:w-full after:h-[1px] after:bg-black/10 after:transition-all after:duration-300 after:ease-in-out after:hover:bg-[#086efa]"
                onClick={() => setShowMore(!showMore)}
              >
                Hide them
              </a>
              .
            </span>
          ) : (
            <span>
              View more of our domains by clicking{" "}
              <a
                className="cursor-pointer relative text-black/50 no-underline transition-all duration-300 ease-in-out hover:text-[#086efa] after:content-[''] after:absolute after:-bottom-[4px] after:left-0 after:w-full after:h-[1px] after:bg-black/10 after:transition-all after:duration-300 after:ease-in-out after:hover:bg-[#086efa]"
                onClick={() => setShowMore(!showMore)}
              >
                here
              </a>
              .
            </span>
          )}
        </p>
        <ul
          className={classNames(
            "-mt-2.5 list-none pl-6 overflow-hidden",
            showMore
              ? "visible opacity-100 max-h-[1600px] [transition:visibility_0.5s,opacity_0.5s_ease-in,max-height_0.5s_ease-in]"
              : "invisible opacity-0 max-h-0 transition-[visibility] [transition:visibility_0.5s,opacity_0.5s_ease-out,max-height_0.5s_ease-out]"
          )}
        >
          {domains
            .filter((domain) => domain !== currentDomain)
            .map((domain) => (
              <li key={domain}>
                <a
                  href={`https://${domain}`}
                  className="text-black/50 no-underline transition-all duration-300 ease-in-out hover:text-[#086efa]"
                >
                  {domain}
                </a>
              </li>
            ))}
        </ul>
        <ul className="mt-2.5 p-0 list-none">
          <li className="float-left inline-block mr-[30px]">
            <a
              href="mailto:domains@yanyuk.com"
              className="relative block py-[4px] text-black/50 no-underline transition-all duration-300 ease-in-out hover:text-[#086efa] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black/10 after:transition-all after:duration-300 after:ease-in-out after:hover:bg-[#086efa]"
              target="_blank"
              rel="noopener noreferrer"
            >
              domains@yanyuk.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch domains
  let domains = [];
  let next = null;
  do {
    let url =
      "https://api.vercel.com/v9/projects/prj_Z0YlJYwDykU31yYXjKcNoVZURPIR/domains" +
      "?redirects=false" +
      "&limit=100" +
      (next != null ? `&until=${next}` : "");
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      },
      method: "get",
    });
    const data = await res.json();

    if (data.domains) {
      domains = [...domains, ...data.domains.map((d) => d.apexName)];
    }

    // Set next value for pagination, if available
    if (data.pagination) {
      next = data.pagination.next;
    }
  } while (next != null);

  // Dedupe domains
  domains = [...new Set(domains)];

  return {
    props: {
      domains,
    },
  };
}
