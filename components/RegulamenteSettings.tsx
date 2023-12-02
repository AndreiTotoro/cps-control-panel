import { Regulament, Volum } from "@/types";
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

export default function RegulamenteSettings() {
  const [regulamente, setRegulamente] = useState<Regulament[] | null>(null);
  const [titluRegulamentNou, setTitluRegulamentNou] = useState<string>("");
  const [linkRegulamentNou, setLinkRegulamentNou] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentLoadingThrashCan, setCurrentLoadingThrashCan] =
    useState<string>("");

  const obtineRegulamente = async () => {
    const regulament = await axios.get<Regulament[]>("/api/get/regulamente", {
      headers: {
        "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
      },
    });
    setRegulamente(regulament.data);
  };

  const adaugaRegulament = async () => {
    setIsAdding(true);
    const regulament = await axios.post<Regulament>(
      "/api/post/regulament",
      {
        titlu: titluRegulamentNou,
        link: linkRegulamentNou,
      },
      {
        headers: {
          "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
        },
      }
    );
    setTitluRegulamentNou("");
    setLinkRegulamentNou("");
    obtineRegulamente();
    setIsAdding(false);
  };

  const stergeRegulament = async (id: string) => {
    setCurrentLoadingThrashCan(id);
    const regulament = await axios.delete<Regulament>(
      "/api/delete/regulament",
      {
        data: {
          id,
        },
        headers: {
          "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
        },
      }
    );
    obtineRegulamente();
    setCurrentLoadingThrashCan("");
  };

  const editeazaRegulament = async (id: string) => {
    const regulamentEditat = await axios.put<Regulament>(
      "/api/put/regulament",
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
    obtineRegulamente();
  };

  useEffect(() => {
    obtineRegulamente();
  }, []);

  return (
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
                Editare Regulamente
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
                  Lista Regulamente
                </Text>
                {regulamente?.length !== 0 && regulamente ? (
                  regulamente.map((regulament) => (
                    <Flex
                      justify={"space-between"}
                      align={["left", "left", "left", "center"]}
                      flexDir={["column", "column", "column", "row"]}
                      p={4}
                      fontSize={"sm"}
                      borderBottom={"1px solid lightgray"}
                      gap={5}
                      color={"black"}
                      key={regulament.id}
                    >
                      <Stack>
                        <Text>
                          <b>Titlu:</b> {regulament.titlu}
                        </Text>
                        <Text>
                          <b>Link:</b> {regulament.link}
                        </Text>
                      </Stack>
                      <Flex
                        align={"center"}
                        gap={4}
                      >
                        <Box
                          _hover={{ cursor: "pointer" }}
                          color={"red"}
                          onClick={() => stergeRegulament(regulament.id)}
                        >
                          {currentLoadingThrashCan == regulament.id ? (
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
                    Momentan nu exista niciun regulament in baza de date.
                  </Text>
                )}
                <Text
                  pt={3}
                  color={"black"}
                  fontWeight={"bold"}
                >
                  Adauga Regulament Nou
                </Text>
                <HStack
                  flexDir={["column", "column", "column", "row"]}
                  color={"black"}
                >
                  <Input
                    value={titluRegulamentNou}
                    onChange={(e) => setTitluRegulamentNou(e.target.value)}
                    placeholder="nume regulament"
                  />
                  <Input
                    value={linkRegulamentNou}
                    onChange={(e) => setLinkRegulamentNou(e.target.value)}
                    placeholder="link regulament"
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
                        onClick={() => adaugaRegulament()}
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
  );
}
