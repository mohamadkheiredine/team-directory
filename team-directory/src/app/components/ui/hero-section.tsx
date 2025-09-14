"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../shared/button";
import Image from "next/image";
import { HeroHeader } from "./hero8-header";
import { InfiniteSlider } from "./infinite-slider";
import { ProgressiveBlur } from "./progessive-blur";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-6xl px-6 lg:flex lg:items-center lg:justify-between lg:gap-12">
                {/* Left text */}
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 leading-tight">
                    Organize Your Team <br /> Like Never Before
                  </h1>
                  <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                    Quickly view, add, edit, and manage your employees with a
                    sleek and responsive interface designed for efficiency and
                    clarity.
                  </p>

                  <p className="mt-8 text-lg font-medium text-indigo-600 dark:text-indigo-400 animate-bounce">
                    Welcome! Start managing your employees now.
                  </p>
                </div>

                {/* Right image */}
                <div className="mt-12 lg:mt-0 lg:w-1/2 relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4ODh8MHwxfHNlYXJjaHwxfHx0ZWFtfGVufDB8fHx8MTY5NDU5MjEwMA&ixlib=rb-4.0.3&q=80&w=1200"
                    alt="Team Collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Powering the best teams</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">welcome to our project</div>
                  <div className="flex">you can see employees here</div>
                  <div className="flex">you can create employees</div>
                  <div className="flex">you can edit employees</div>
                  <div className="flex">you can delete employees</div>
                  <div className="flex">you can view employee details</div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
