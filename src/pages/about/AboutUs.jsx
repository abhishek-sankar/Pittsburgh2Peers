import { Avatar } from "antd";
import {
  AbhishekSankar,
  AdithiDange,
  AnirudhBelwadi,
  HarshwardhanSinha,
  ShreyasSanghvi,
} from "../../assets";
import { LinkedinFilled } from "@ant-design/icons";
import { motion } from "framer-motion";

const AboutUs = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const team = [
    {
      name: "Abhishek Sankar",
      image: AbhishekSankar,
      linkedIn: "https://www.linkedin.com/in/abhishek-sankar-in",
      class: "Incoming MSAII Fall 24",
    },
    {
      name: "Anirudh Belwadi",
      image: AnirudhBelwadi,
      linkedIn: "https://www.linkedin.com/in/anirudh-srinath-belwadi/",
      class: "Incoming MISM Fall 24",
    },
    {
      name: "Adithi Dange",
      image: AdithiDange,
      linkedIn: "https://in.linkedin.com/in/adithi-dange",
      class: "Incoming MIIPS Fall 24",
    },
    {
      name: "Shreyas Sanghvi",
      image: ShreyasSanghvi,
      linkedIn: "https://www.linkedin.com/in/shreyas-sanghvi",
      class: "Incoming MSBME Fall 24",
    },
    {
      name: "Harshwardhan Sinha",
      image: HarshwardhanSinha,
      linkedIn: "https://www.linkedin.com/in/harshwardhansinha/",
      class: "Incoming MSBA Fall 24",
    },
  ];
  return (
    <div className="flex flex-col p-8">
      <h3 className="font-semibold text-base">
        Meet the team that brought you Pittsburgh 2 Peers!
      </h3>

      <div className="grid grid-cols-2 gap-6 py-4">
        {shuffleArray(team).map((member, index) => (
          <motion.div
            key={index}
            className="card flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* <Skeleton loading={!member.image} avatar active> */}
            <Avatar src={member.image} alt={member.name} size={100} />
            <div className="flex flex-col justify-center items-center gap-2">
              <p>{member.name}</p>
              <p className="text-xs">{member.class}</p>
              <a href={member.linkedIn} target="_blank" rel="noreferrer">
                <LinkedinFilled className="text-xl" />
              </a>
            </div>
            {/* </Skeleton> */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
