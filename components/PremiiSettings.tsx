import useCPSStore from "@/store/useCPSStore";
import { Premiu, Volum } from "@/types";
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

export default function PremiiSettings() {
  const { isMaster } = useCPSStore();
  const [premii, setPremii] = useState<Premiu[] | "">("");
  const [titluPremiuNou, setTitluPremiuNou] = useState<string>("");
  const [linkPremiuNou, setLinkPremiuNou] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentLoadingThrashCan, setCurrentLoadingThrashCan] =
    useState<string>("");

  const obtinePremii = async () => {
    const premii = await axios.get<Volum[]>("/api/get/premii");
    setPremii(premii.data);
  };

  const adaugaPremiu = async () => {
    setIsAdding(true);
    const premiu = await axios.post<Premiu>(
      "/api/post/premiu",
      {
        titlu: titluPremiuNou,
        link: linkPremiuNou,
      },
      {
        headers: {
          "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
        },
      }
    );
    setTitluPremiuNou("");
    setLinkPremiuNou("");
    obtinePremii();
    setIsAdding(false);
  };

  const stergePremiu = async (id: string) => {
    setCurrentLoadingThrashCan(id);
    const premiu = await axios.delete<Premiu>("/api/delete/premiu", {
      data: {
        id,
      },
      headers: {
        "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
      },
    });
    obtinePremii();
    setCurrentLoadingThrashCan("");
  };

  const editeazaPremiu = async (id: string) => {
    const premiuEditat = await axios.put<Volum>(
      "/api/put/premiu",
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
    obtinePremii();
  };

  useEffect(() => {
    obtinePremii();
  }, []);

  return (
    <Accordion
      w={"100%"}
      border={"3px solid black"}
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
              Editare Premii
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack>
            <Stack
              bg={"white"}
              p={5}
              w={["100%", "100%", "100%", "70%"]}
              rounded={"lg"}
            >
              <Text
                textAlign={"center"}
                color={"#fc5310"}
                fontSize={"xl"}
                fontWeight={"bold"}
              >
                Lista Premii
              </Text>
              {premii && premii?.length !== 0 ? (
                premii.map((premiu) => (
                  <Flex
                    justify={"space-between"}
                    align={["left", "left", "left", "center"]}
                    flexDir={["column", "column", "column", "row"]}
                    p={4}
                    fontSize={"sm"}
                    borderBottom={"1px solid lightgray"}
                    gap={5}
                    color={"black"}
                    key={premiu.id}
                  >
                    <Stack>
                      <Text>
                        <b>Titlu:</b> {premiu.titlu}
                      </Text>
                      <Text>
                        <b>Link:</b> {premiu.link}
                      </Text>
                    </Stack>
                    <Flex
                      align={"center"}
                      gap={4}
                    >
                      <Box
                        _hover={{ cursor: "pointer" }}
                        color={"red"}
                        onClick={() =>
                          isMaster
                            ? stergePremiu(premiu.id)
                            : alert("Masterkey Gresit")
                        }
                      >
                        {currentLoadingThrashCan == premiu.id ? (
                          <Spinner />
                        ) : (
                          <FiTrash />
                        )}
                      </Box>
                    </Flex>
                  </Flex>
                ))
              ) : (
                <Text color={"black"}>
                  Momentan nu exista niciun premiu in baza de date.
                </Text>
              )}
              <Text
                pt={3}
                color={"black"}
                fontWeight={"bold"}
              >
                Adauga Premiu Nou
              </Text>
              <HStack
                flexDir={["column", "column", "column", "row"]}
                color={"black"}
              >
                <Input
                  value={titluPremiuNou}
                  onChange={(e) => setTitluPremiuNou(e.target.value)}
                  placeholder="nume premiu"
                />
                <Input
                  value={linkPremiuNou}
                  onChange={(e) => setLinkPremiuNou(e.target.value)}
                  placeholder="link premiu"
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
                      onClick={() =>
                        isMaster ? adaugaPremiu() : alert("Masterkey Gresit")
                      }
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
  );
}
