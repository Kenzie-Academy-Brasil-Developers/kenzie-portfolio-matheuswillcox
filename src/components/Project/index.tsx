import {
  Project as ProjectWrapper,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";
import { SiVercel } from "react-icons/si";

interface ReposType {
  html_url: string | undefined;
  id: number;
  name: string;
  language: string;
  description: string;
  git_url: string;
  homepage: string;
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Response = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos`
      );

      const json = await data.json();

      setRepositories(json);

      if (!data.ok) {
        throw data;
      }

      return json;
    };
    fetchData();
  }, []);

  return (
    <>
      <ProjectLinks>
        <ProjectLink
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          target="_blank"
          href="https://vercel.com/matheuswillcox"
        >
          <div className="c-iyXKPn c-iyXKPn-bZSQoK-type-heading3 c-iyXKPn-ImBLK-color-grey1 c-iyXKPn-ihAaffR-css">
            <SiVercel /> Meu Vercel
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            {" "}
            <a style={{ color:"black"}} href="https://react-entrega-s3-kenzishop-com-context-api-matheuswi-bbkg9bwll.vercel.app/">
            Kenzie Shop
            </a>
            <a style={{ color:"black"}} href="https://capstone-m3-delta.vercel.app/login">PokeApi</a>
            <a style={{ color:"black"}} href="https://react-entrega-s2-kenzie-hub-matheuswillcox.vercel.app/">
              Kenzie Hub
            </a>
            <a style={{ color:"black"}} href="https://react-entrega-s1-hamburgueria-da-kenzie-matheuswillcox.vercel.app/">
              Burguer Kenzie
            </a>
          </div>
        </ProjectLink>
      </ProjectLinks>

      {repositories?.map((repository) => (
        <ProjectWrapper key={repository.id}>
          <Text
            as="h2"
            type="heading3"
            css={{ marginBottom: "$3" }}
            color="grey1"
          >
            {repository.name}
          </Text>

          {repository.language && (
            <ProjectStack>
              <Text type="body2">Linguagem:</Text>
              <ProjectStackTech>
                <Text color="brand1" type="body2">
                  {repository.language}
                </Text>
              </ProjectStackTech>
            </ProjectStack>
          )}

          <Text type="body1" color="grey2">
            {repository.description}
          </Text>
          <ProjectLinks>
            <ProjectLink target="_blank" href={repository.html_url}>
              <FaGithub /> Github Code
            </ProjectLink>
            {repository.homepage && (
              <ProjectLink target="_blank" href={repository.homepage}>
                <FaShare /> Aplicação
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectWrapper>
      ))}
    </>
  );
};
