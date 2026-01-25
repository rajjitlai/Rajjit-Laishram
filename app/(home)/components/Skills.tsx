import Title from '@/components/Title'
import React, { useEffect, useState } from 'react'
import { FaGitSquare, FaDocker, FaRaspberryPi, FaJava, FaPhp, FaSlack } from 'react-icons/fa'
import { SiAppwrite, SiArduino, SiAuth0, SiC, SiCanva, SiCloudflare, SiCplusplus, SiCss3, SiDjango, SiDotnet, SiEslint, SiExpress, SiFastapi, SiFigma, SiFlask, SiFramer, SiGithubactions, SiHtml5, SiIntellijidea, SiJavascript, SiJsonwebtokens, SiJupyter, SiKeras, SiMarkdown, SiMongodb, SiMui, SiMysql, SiNetlify, SiNextdotjs, SiNodedotjs, SiNumpy, SiOpencv, SiPandas, SiPostgresql, SiPostman, SiPrettier, SiPycharm, SiPython, SiPytorch, SiRailway, SiReact, SiRender, SiSass, SiSocketdotio, SiSqlite, SiStyledcomponents, SiSwagger, SiTailwindcss, SiTensorflow, SiThreedotjs, SiTypescript, SiVercel, SiVite } from 'react-icons/si'
import { TbApi, TbBrain, TbBrandCSharp, TbBrandReactNative, TbBrandVscode, TbChartArea, TbCloudComputing, TbCpu, TbNetwork, TbPackage, TbTerminal2 } from 'react-icons/tb'
import { BiChip } from 'react-icons/bi'
import { MdOutlineStorage } from 'react-icons/md'
import { IconType } from 'react-icons'

function Skills() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 1500); // Change every 1.5 seconds
        return () => clearInterval(interval);
    }, []);

    const SkillCard = ({ text, Icon, index, totalInSection, color }: { text: string; Icon: IconType; index: number; totalInSection: number; color: string }) => {
        const isGlowing = (currentIndex % totalInSection) === index;
        const glowColor = color === 'mine'
            ? 'rgba(56, 255, 66, 0.6)' // green
            : 'rgba(0, 253, 234, 0.6)'; // cyan

        const borderColor = color === 'mine' ? 'border-mine' : 'border-hers';
        const textColor = color === 'mine' ? 'text-mine' : 'text-hers';

        // Dynamic hover classes
        const hoverBorder = color === 'mine' ? 'hover:border-mine' : 'hover:border-hers';
        const hoverText = color === 'mine' ? 'group-hover:text-mine' : 'group-hover:text-hers';
        const hoverShadow = color === 'mine' ? 'hover:shadow-[0_0_15px_rgba(56,255,66,0.5)]' : 'hover:shadow-[0_0_15px_rgba(0,253,234,0.5)]';

        return (
            <div className={`flex flex-col items-center gap-2 p-3 bg-black border transition-all duration-300 cursor-pointer group hover:scale-110 ${hoverShadow} ${isGlowing
                    ? `${borderColor} scale-105`
                    : `border-gray-800 ${hoverBorder}`
                }`}
                style={{
                    boxShadow: isGlowing ? `0 0 15px ${glowColor}` : undefined
                }}>
                <Icon className={`w-5 h-5 transition-colors duration-300 ${isGlowing ? textColor : `text-gray-400 ${hoverText}`
                    }`} />
                <p className='text-xs text-gray-300 text-center transition-colors duration-300 group-hover:text-white'>{text}</p>
            </div>
        );
    };

    const SkillsGrid = ({ items, color }: { items: { text: string; Icon: IconType }[]; color: string }) => {
        const cols = 3;
        const getSnakeIndex = (idx: number) => {
            const row = Math.floor(idx / cols);
            const col = idx % cols;
            // If row is even, go left to right; if odd, go right to left
            const snakeCol = row % 2 === 0 ? col : (cols - 1 - col);
            return row * cols + snakeCol;
        };

        return (
            <div className='grid grid-cols-3 gap-3'>
                {items.map((item, idx) => {
                    const snakeIdx = getSnakeIndex(idx);
                    return (
                        <SkillCard
                            key={idx}
                            text={item.text}
                            Icon={item.Icon}
                            index={snakeIdx}
                            totalInSection={items.length}
                            color={color}
                        />
                    );
                })}
            </div>
        );
    };
    const iotSkills = [
        {
            text: "IoT Development",
            Icon: TbNetwork,
        },
        {
            text: "Raspberry Pi",
            Icon: FaRaspberryPi,
        },
        {
            text: "Arduino",
            Icon: SiArduino,
        },
        {
            text: "ESP32/ESP8266",
            Icon: BiChip,
        },
        {
            text: "MQTT",
            Icon: TbNetwork,
        },
        {
            text: "WebSockets",
            Icon: TbNetwork,
        },
        {
            text: "Edge Computing",
            Icon: TbCpu,
        },
        {
            text: "Embedded Systems",
            Icon: FaRaspberryPi,
        },
        {
            text: "Sensor Integration",
            Icon: TbNetwork,
        },
        {
            text: "IoT Dashboards",
            Icon: TbChartArea,
        },
        {
            text: "TTN",
            Icon: TbCloudComputing,
        },
    ];

    const frontendSkills = [
        {
            text: "Next.js",
            Icon: SiNextdotjs,
        },
        {
            text: "React",
            Icon: SiReact,
        },
        {
            text: "React Native",
            Icon: TbBrandReactNative,
        },
        {
            text: "Tailwind CSS",
            Icon: SiTailwindcss,
        },
        {
            text: "JavaScript",
            Icon: SiJavascript,
        },
        {
            text: "TypeScript",
            Icon: SiTypescript,
        },
        {
            text: "HTML",
            Icon: SiHtml5,
        },
        {
            text: "CSS",
            Icon: SiCss3,
        },
        {
            text: "SASS/SCSS",
            Icon: SiSass,
        },
        {
            text: "Zustand",
            Icon: MdOutlineStorage,
        },
        {
            text: "Styled Components",
            Icon: SiStyledcomponents,
        },
        {
            text: "Material-UI",
            Icon: SiMui,
        },
        {
            text: "shadcn/ui",
            Icon: TbPackage,
        },
        {
            text: "Framer Motion",
            Icon: SiFramer,
        },
        {
            text: "Three.js",
            Icon: SiThreedotjs,
        },
        {
            text: "Vite",
            Icon: SiVite,
        },
        {
            text: "Turbopack",
            Icon: TbPackage,
        },
        {
            text: "ESLint",
            Icon: SiEslint,
        },
        {
            text: "Prettier",
            Icon: SiPrettier,
        },
    ];

    const backendSkills = [
        {
            text: "Node.js",
            Icon: SiNodedotjs,
        },
        {
            text: "Express",
            Icon: SiExpress,
        },
        {
            text: "FastAPI",
            Icon: SiFastapi,
        },
        {
            text: "Django",
            Icon: SiDjango,
        },
        {
            text: "Flask",
            Icon: SiFlask,
        },
        {
            text: "RESTful APIs",
            Icon: TbApi,
        },
        {
            text: "Socket.io",
            Icon: SiSocketdotio,
        },
        {
            text: "MongoDB",
            Icon: SiMongodb,
        },
        {
            text: "PostgreSQL",
            Icon: SiPostgresql,
        },
        {
            text: "MySQL",
            Icon: SiMysql,
        },
        {
            text: "SQLite",
            Icon: SiSqlite,
        },
        {
            text: "Appwrite",
            Icon: SiAppwrite,
        },
        {
            text: "JWT",
            Icon: SiJsonwebtokens,
        },
        {
            text: "OAuth",
            Icon: SiAuth0,
        },
    ];

    const aiMlSkills = [
        {
            text: "TensorFlow",
            Icon: SiTensorflow,
        },
        {
            text: "PyTorch",
            Icon: SiPytorch,
        },
        {
            text: "Keras",
            Icon: SiKeras,
        },
        {
            text: "OpenCV",
            Icon: SiOpencv,
        },
        {
            text: "YOLO",
            Icon: TbBrain,
        },
        {
            text: "MediaPipe",
            Icon: TbBrain,
        },
        {
            text: "HuggingFace",
            Icon: TbBrain,
        },
        {
            text: "Ollama",
            Icon: TbBrain,
        },
        {
            text: "Pandas",
            Icon: SiPandas,
        },
        {
            text: "NumPy",
            Icon: SiNumpy,
        },
        {
            text: "Jupyter",
            Icon: SiJupyter,
        },
    ];

    const languagesSkills = [
        {
            text: "Python",
            Icon: SiPython,
        },
        {
            text: "C++",
            Icon: SiCplusplus,
        },
        {
            text: "C",
            Icon: SiC,
        },
        {
            text: "C#",
            Icon: TbBrandCSharp,
        },
        {
            text: "Java",
            Icon: FaJava,
        },
        {
            text: "PHP",
            Icon: FaPhp,
        },
        {
            text: "Shell/Bash",
            Icon: TbTerminal2,
        },
        {
            text: ".NET",
            Icon: SiDotnet,
        },
    ];

    const toolsSkills = [
        {
            text: "Git",
            Icon: FaGitSquare,
        },
        {
            text: "GitHub Actions",
            Icon: SiGithubactions,
        },
        {
            text: "Docker",
            Icon: FaDocker,
        },
        {
            text: "Docker Compose",
            Icon: FaDocker,
        },
        {
            text: "VS Code",
            Icon: TbBrandVscode,
        },
        {
            text: "PyCharm",
            Icon: SiPycharm,
        },
        {
            text: "IntelliJ IDEA",
            Icon: SiIntellijidea,
        },
        {
            text: "Postman",
            Icon: SiPostman,
        },
        {
            text: "Swagger",
            Icon: SiSwagger,
        },
        {
            text: "Figma",
            Icon: SiFigma,
        },
        {
            text: "Canva",
            Icon: SiCanva,
        },
        {
            text: "Markdown",
            Icon: SiMarkdown,
        },
        {
            text: "Slack",
            Icon: FaSlack,
        },
    ];

    const cloudSkills = [
        {
            text: "Cloud Platforms",
            Icon: TbCloudComputing,
        },
        {
            text: "Vercel",
            Icon: SiVercel,
        },
        {
            text: "Netlify",
            Icon: SiNetlify,
        },
        {
            text: "Cloudflare",
            Icon: SiCloudflare,
        },
        {
            text: "Railway",
            Icon: SiRailway,
        },
        {
            text: "Render",
            Icon: SiRender,
        },
    ];

    return (
        <div className='max-w-7xl mx-auto px-8 font-merriweather relative' id='skills'>
            <Title text='Skills 💻' className='flex flex-col items-center justify-center cursor-pointer relative z-10' />

            {/* Row 1: Frontend (left) + Backend & Database (right) */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16'>
                <div>
                    <h3 className='text-2xl font-bold text-center text-hers mb-4'>Frontend Development</h3>
                    <SkillsGrid items={frontendSkills} color='hers' />
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-center text-mine mb-4'>Backend & Database</h3>
                    <SkillsGrid items={backendSkills} color='mine' />
                </div>
            </div>

            {/* Row 2: IoT & Hardware (left) + AI/ML (right) */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
                <div>
                    <h3 className='text-2xl font-bold text-center text-mine mb-4'>IoT & Hardware</h3>
                    <SkillsGrid items={iotSkills} color='mine' />
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-center text-hers mb-4'>AI & Machine Learning</h3>
                    <SkillsGrid items={aiMlSkills} color='hers' />
                </div>
            </div>

            {/* Row 3: Cloud & Hosting (left) + Programming Languages (right) */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
                <div>
                    <h3 className='text-2xl font-bold text-center text-hers mb-4'>Cloud & Hosting</h3>
                    <SkillsGrid items={cloudSkills} color='hers' />
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-center text-mine mb-4'>Programming Languages</h3>
                    <SkillsGrid items={languagesSkills} color='mine' />
                </div>
            </div>

            {/* Row 4: Tools & DevOps (centered, full width) */}
            <div className='mt-12'>
                <h3 className='text-2xl font-bold text-center text-mine mb-4'>Tools & DevOps</h3>
                <SkillsGrid items={toolsSkills} color='mine' />
            </div>
        </div>
    )
}

export default Skills