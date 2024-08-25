import { Button } from "@/components/ui/button";
import { PlayIcon } from "@radix-ui/react-icons";
import { CgTrending } from "react-icons/cg";
import { FiPieChart } from "react-icons/fi";
import { BiCommand } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiCheckCircle } from "react-icons/hi";
import Navbar from "@/components/ui/Navbar";
import Managex from "@/components/ui/Managex";
import Plans from "@/components/ui/Plans";
import Footer from "@/components/ui/Footer";
export default function Home() {
  return (
    <>
      <Navbar/>
      <main className="flex min-h-screen flex-col items-center pt-20 md:pt-32 px-5 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:mb-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold ">
              We&apos;re here to Enhance your Work & Company
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary w-full h-20"
            >
              <path
                d="M10 50 Q200 10, 390 50"
                fill="none"
                stroke="#7F00FF"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-lg font-semibold lg:w-4/5 pb-5">
              Let&apos;s make your work more organize and easily using the{" "}
              <Managex />
              Dashboard with many of the latest features in managing work every
              day.
            </p>
            <div className="flex items-center gap-3">
              <Button className="rounded-3xl">Try for free</Button>
              <Button variant="ghost" className="rounded-3xl hover:text-primary">
                <span className="border border-black p-1 rounded-full mr-2">
                  <PlayIcon className="w-4 h-4" />
                </span>
                View Demo
              </Button>
            </div>
          </div>
          <div className="pt-5">
            <img src="/home.png" alt="HomepagePhoto" />
          </div>
        </div>
        {/* Companies */}
        <div className="text-center">
          <h1 className="font-bold text-xl lg:text-4xl pt-10">
            More than 25,000 teams use <Managex />
          </h1>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-5 my-5 text-xl text-foregroundAccent">
            <p>EP Cart</p>
            <p>Mega Mart</p>
            <p>Shoose</p>
            <p>Clieo</p>
            <p>Needus</p>
            <p>Aplex</p>
          </div>
        </div>

        {/* Support */}

        <div className="flex flex-col lg:flex-row gap-5 py-20">
          <div>
            <h1 className="text-5xl font-bold">
              How we support our partner all over the world
            </h1>
            <p className="py-5 text-foregroundAccent pr-5">
              SaaS become a common delivery model for many business application,
              including office software, messaging software, payroll processing
              software, DBMS software, management software
            </p>
            <div className="flex gap-5">
              <div>
                <div className="flex gap-2 text-yellow-500">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <p>4.9/5 rating</p>
                <p className="text-foregroundAccent">UI Design</p>
              </div>
              <div>
                <div className="flex gap-2 text-yellow-500">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <p>4.1/5 rating</p>
                <p className="text-foregroundAccent">UX Design</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2">
              <div className="p-2 bg-backgroundAccent h-fit shadow">
                <CgTrending className="text-xl text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Publishing</h4>
                <p className="text-foregroundAccent">
                  Plan, collaborate, and publishing your content that drives
                  meaningful engagement and growth for your brand
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="p-2 bg-backgroundAccent h-fit shadow">
                <FiPieChart className="text-xl text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Analytics</h4>
                <p className="text-foregroundAccent">
                  Analyze your performance and create gorgeous report
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="p-2 bg-backgroundAccent h-fit shadow">
                <BiCommand className="text-xl text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Engagement</h4>
                <p className="text-foregroundAccent">
                  Quickly navigate you and engage with your audience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 pb-10">
            <h1 className="text-5xl font-bold">Our Features you can get</h1>
            <p className="py-3 text-foregroundAccent">
              We offer a variety of interesting features that you can help
              increase yor productivity at work and manage your project easily
            </p>
            <div className="flex items-center justify-center">
              <Button className="rounded-3xl">Get Started</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div>
              <div className="md:px-20 lg:px-5">
                <img alt="collaboration" src="/collboration.png" />
              </div>
              <h4 className="font-bold pt-5 pb-2">Collaboration Teams</h4>
              <p className="text-foregroundAccent">
                Here you can handle projects together with team virtually
              </p>
            </div>
            <div>
              <div className="md:px-20 lg:px-5">
                <img alt="Cloud Storage" src="/cloud.png" />
              </div>
              <h4 className="font-bold pt-5 pb-2">Cloud Storage</h4>
              <p className="text-foregroundAccent">
                No need to worry about storage because we provide storage up to
                2 TB
              </p>
            </div>
            <div>
              <div className="md:px-20 lg:px-5">
                <img alt="Employee" src="/employee.png" />
              </div>
              <h4 className="font-bold pt-5 pb-2">Employee Management</h4>
              <p className="text-foregroundAccent">
                Easily Manage all the teams and employees in different
                department easily
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}

        <div className="grid grid-cols-1 lg:grid-cols-2 py-16">
          <div className="py-8">
            <h2 className="font-bold text-4xl py-5">
              What Benefit Will <br></br> You Get
            </h2>
            <div className="flex flex-col gap-4">
              <p className="flex gap-2 items-center">
                <HiCheckCircle className="text-primary text-xl" />
                Managing Employees with Ease
              </p>
              <p className="flex gap-2 items-center">
                <HiCheckCircle className="text-primary text-xl" />
                Focused on Project Handling
              </p>
              <p className="flex gap-2 items-center">
                <HiCheckCircle className="text-primary text-xl" />
                Onboarding new Employees
              </p>
              <p className="flex gap-2 items-center">
                <HiCheckCircle className="text-primary text-xl" />
                Saving Money For The Future
              </p>
              <p className="flex gap-2 items-center">
                <HiCheckCircle className="text-primary text-xl" />
                Easy Chats & Video Conferences.
              </p>
            </div>
          </div>
          <div>
            <img alt="Benefits" src="/benefits.png" />
          </div>
        </div>

        {/* Subscription Plans */}
        <Plans />
      </main>
      <Footer/>
    </>
  );
}
