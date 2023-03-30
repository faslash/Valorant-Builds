import axios from "axios";
import * as React from "react";
import { loadingContext } from "../../components/loading";
import { toast } from "react-toastify";
import { volumeContext } from "../../components/volumeProvider";
import { Volume } from "../../components/volume";

function Home() {
  const [data, setData] = React.useState([{}]);
  const [agent, setAgent] = React.useState({});
  const [abilities, setAbilities] = React.useState([{}]);
  const [ability, setAbility] = React.useState(0);
  const [audioUrl, setAudioUrl] = React.useState("");
  const { setIsLoading } = React.useContext(loadingContext);
  const { isMuted } = React.useContext(volumeContext);

  const audio = new Audio(audioUrl);

  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://valorant-api.com/v1/agents", {
        params: { isPlayableCharacter: true },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error(error);
      });
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (!isMuted) {
      audio.play();
    }
  }, [audioUrl]);

  async function loadCharacter(uuid) {
    setIsLoading(true);
    await axios
      .get("https://valorant-api.com/v1/agents/" + uuid, {
        params: { language: "pt-BR" },
      })
      .then((response) => {
        setAbility(0);
        setAudioUrl(response.data.data.voiceLine.mediaList[0].wave);

        setAgent(response.data.data);
        setAbilities(response.data.data.abilities);
      })
      .catch((error) => {
        toast.error(error);
      });

    setIsLoading(false);
  }

  function loadAbility(index) {
    setAbility(index);
  }

  return (
    <div className="min-h-screen flex justify-center align-middle">
      <div className="container flex flex-row gap-0 h-[75vh] bg-valorant-red backdrop-blur-sm bg-opacity-20 rounded self-center">
        <div className=" basis-1/5 text-center overflow-y-auto">
          {data.map((dados) => (
            <div
              className="flex hover:bg-red-800 cursor-pointer"
              key={dados.uuid}
              onClick={() => loadCharacter(dados.uuid)}
            >
              <img
                src={dados.displayIcon}
                alt="profile_icon"
                className="rounded-l-lg"
                width="64"
                height="64"
              />
              <div className="flex justify-center align-middle mx-auto my-auto text-center">
                <p className="text-2xl pointer-events-none">
                  {dados.displayName}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="basis-4/5 flex">
          <div className="basis-4/5 h-full">
            <div className="flex justify-between items-center m-10 space-x-4">
              <div className="">
                <p className="text-5xl">{agent.displayName}</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-xl">
                  {agent.role ? agent.role.displayName : ""}
                </p>
                <img
                  src={agent.role ? agent.role.displayIcon : ""}
                  alt=""
                  width="48"
                  height="48"
                />
              </div>
            </div>
            <div className="m-10 h-40 text-lg">
              <p>{agent.description}</p>
            </div>
            <div className="m-10 text-center">
              <p className="text-3xl mb-10">Habilidades</p>
              <p className="text-xl">
                {agent.abilities ? agent.abilities[ability].displayName : ""}
              </p>
              <div className="h-40">
                <p>
                  {agent.abilities ? agent.abilities[ability].description : ""}
                </p>
              </div>
              <div className="flex justify-center m-5 gap-20">
                {abilities.map((ability, index) => {
                  return (
                    <div
                      className="hover:cursor-pointer hover:bg-emerald-700 border border-sky-500"
                      onClick={() => loadAbility(index)}
                    >
                      <img
                        src={ability.displayIcon}
                        alt="Habilidade"
                        width={64}
                        height={64}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex">
            <img
              className="basis-1/5 h-full m-0"
              src={agent.fullPortrait}
              alt="Imagem Personagem"
            />
            <Volume />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
