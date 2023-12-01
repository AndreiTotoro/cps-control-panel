import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import "dotenv/config";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Volum } from "@/types";
import { FiTrash } from "react-icons/fi";

export default function Home() {
  const [volume, setVolume] = useState<Volum[] | "">("");
  const [titluVolumNou, setTitluVolumNou] = useState<string>("");
  const [linkVolumNou, setLinkVolumNou] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentLoadingThrashCan, setCurrentLoadingThrashCan] =
    useState<string>("");

  const obtineVolume = async () => {
    const volume = await axios.get<Volum[]>("/api/get/volume", {
      headers: {
        "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
      },
    });
    setVolume(volume.data);
  };

  const adaugaVolum = async () => {
    setIsAdding(true);
    const volum = await axios.post<Volum>(
      "/api/post/volum",
      {
        titlu: titluVolumNou,
        link: linkVolumNou,
      },
      {
        headers: {
          "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
        },
      }
    );
    setTitluVolumNou("");
    setLinkVolumNou("");
    obtineVolume();
    setIsAdding(false);
  };

  const stergeVolum = async (id: string) => {
    setCurrentLoadingThrashCan(id);
    const volum = await axios.delete<Volum>("/api/delete/volum", {
      data: {
        id,
      },
      headers: {
        "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
      },
    });
    obtineVolume();
    setCurrentLoadingThrashCan("");
  };

  const editeazaVolum = async (id: string) => {
    const volumEditat = await axios.put<Volum>(
      "/api/put/volum",
      {
        titlu: "hi",
        link: "bye",
        id,
      },
      {
        headers: {
          "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
        },
      }
    );
    obtineVolume();
  };

  useEffect(() => {
    obtineVolume();
  }, []);

  return (
    <Layout>
      <Center>
        <Accordion
          width={["100%", "100%", "100%", "70%"]}
          bg={"white"}
          color={"black"}
          allowToggle
        >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  fontSize={"xl"}
                  fontWeight={"bold"}
                  as="span"
                  flex="1"
                  textAlign="center"
                >
                  Editare Volume
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack>
                <Stack
                  bg={"white"}
                  p={5}
                  rounded={"lg"}
                >
                  <Text
                    textAlign={"center"}
                    color={"black"}
                    fontSize={"xl"}
                    fontWeight={"bold"}
                  >
                    Lista Volume
                  </Text>
                  {volume ? (
                    volume.map((volum) => (
                      <Flex
                        justify={"space-between"}
                        align={["left", "left", "left", "center"]}
                        flexDir={["column", "column", "column", "row"]}
                        p={4}
                        fontSize={"sm"}
                        borderBottom={"1px solid lightgray"}
                        gap={5}
                        color={"black"}
                        key={volum.id}
                      >
                        <Stack>
                          <Text>
                            <b>Titlu:</b> {volum.titlu}
                          </Text>
                          <Text>
                            <b>Link:</b> {volum.link}
                          </Text>
                        </Stack>
                        <Flex
                          align={"center"}
                          gap={4}
                        >
                          <Box
                            _hover={{ cursor: "pointer" }}
                            color={"red"}
                            onClick={() => stergeVolum(volum.id)}
                          >
                            {currentLoadingThrashCan == volum.id ? (
                              <Spinner />
                            ) : (
                              <FiTrash />
                            )}
                          </Box>
                          <Button
                            onClick={() => editeazaVolum(volum.id)}
                            fontSize={"sm"}
                            h={7}
                          >
                            Editeaza
                          </Button>
                        </Flex>
                      </Flex>
                    ))
                  ) : (
                    <Text color={"black"}>
                      Momentan nu exista niciun volum in baza de date.
                    </Text>
                  )}
                  <Text
                    pt={3}
                    color={"black"}
                    fontWeight={"bold"}
                  >
                    Adauga Volum Nou
                  </Text>
                  <HStack
                    flexDir={["column", "column", "column", "row"]}
                    color={"black"}
                  >
                    <Input
                      value={titluVolumNou}
                      onChange={(e) => setTitluVolumNou(e.target.value)}
                      placeholder="nume volum"
                    />
                    <Input
                      value={linkVolumNou}
                      onChange={(e) => setLinkVolumNou(e.target.value)}
                      placeholder="link volum"
                    />
                    <Box
                      rounded={"xl"}
                      textAlign={"center"}
                      bg={"lightgray"}
                      width={["100%", "100%", "100%", "20%"]}
                      height={10}
                    >
                      {isAdding ? (
                        <Center height={"100%"}>
                          <Spinner />
                        </Center>
                      ) : (
                        <Button
                          bg={"none"}
                          _hover={{ bg: "none" }}
                          onClick={() => adaugaVolum()}
                        >
                          Adauga
                        </Button>
                      )}
                    </Box>
                  </HStack>
                </Stack>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Center>
    </Layout>
  );
}
