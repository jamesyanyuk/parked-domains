import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import classNames from "../util/classNames";

export default function Home({ domains }) {
  const [currentDomain, setCurrentDomain] = useState("...");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setCurrentDomain(window.location.hostname);
  }, [setCurrentDomain]);

  return (
    <div className="h-screen flex">
      <div className="fade container m-auto">
        <a
          href="https://yanyuk.com/"
          className="inline-block w-[100px] h-[42px] mb-[36px] mr-[18px] indent-[-9999px] bg-[url('/yanyuk.png')] bg-contain bg-left bg-no-repeat"
        >
          Yanyuk
        </a>
        <h1>Parked Domain ({currentDomain})</h1>
        <p>
          Inquire with offer via email.
          <br />
          {showMore ? (
            <span>
              More domains below.{" "}
              <a
                style={{ cursor: "pointer" }}
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
                style={{ cursor: "pointer" }}
                onClick={() => setShowMore(!showMore)}
              >
                here
              </a>
              .
            </span>
          )}
        </p>
        <ul
          style={{
            marginTop: -10,
            visibility: showMore ? "visible" : "hidden",
            opacity: showMore ? 1 : 0,
            transition: showMore
              ? "visibility 0.5s, opacity 0.5s ease-in, max-height 0.5s ease-in"
              : "visibility 0.5s, opacity 0.5s ease-out, max-height 0.5s ease-out",
            listStyleType: "none",
            paddingLeft: 24,
            overflow: "hidden",
            maxHeight: showMore ? 1600 : 0,
          }}
        >
          {domains
            .filter((domain) => domain !== currentDomain)
            .map((domain) => (
              <li key={domain}>
                <a href={`https://${domain}`} className={styles.domain}>
                  {domain}
                </a>
              </li>
            ))}
        </ul>
        <ul className={styles.socialLinks}>
          <li>
            <a
              href="mailto:domains@yanyuk.com"
              className={styles.one}
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
