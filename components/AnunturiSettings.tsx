import useCPSStore from "@/store/useCPSStore";
import { Anunt, Premiu, Volum } from "@/types";
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
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

export default function AnunturiSettings() {
  const { isMaster } = useCPSStore();
  const [anunturi, setAnunturi] = useState<Anunt[] | "">("");
  const [titluAnuntNou, setTitluAnuntNou] = useState<string>("");
  const [continutAnuntNou, setContinutAnuntNou] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentLoadingThrashCan, setCurrentLoadingThrashCan] =
    useState<string>("");

  const obtineAnunturi = async () => {
    const anunturi = await axios.get<Anunt[]>("/api/get/anunturi");
    setAnunturi(anunturi.data);
  };

  const adaugaAnunt = async () => {
    setIsAdding(true);
    const anunt = await axios.post<Anunt>(
      "/api/post/anunt",
      {
        titlu: titluAnuntNou,
        continut: continutAnuntNou,
      } as Anunt,
      {
        headers: {
          "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
        },
      }
    );
    setTitluAnuntNou("");
    setContinutAnuntNou("");
    obtineAnunturi();
    setIsAdding(false);
  };

  const stergeAnunt = async (id: string) => {
    setCurrentLoadingThrashCan(id);
    const anunt = await axios.delete<Anunt>("/api/delete/anunt", {
      data: {
        id,
      },
      headers: {
        "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
      },
    });
    obtineAnunturi();
    setCurrentLoadingThrashCan("");
  };

  const editeazaAnunt = async (id: string) => {
    const anuntEditat = await axios.put<Anunt>(
      "/api/put/anunt",
      {
        titlu: "hi",
        continut: "bye",
      },
      {
        headers: {
          "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
        },
      }
    );
    obtineAnunturi();
  };

  useEffect(() => {
    obtineAnunturi();
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
              Editare Anunturi
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack>
            <Stack
              w={["100%", "100%", "100%", "70%"]}
              bg={"white"}
              p={5}
              rounded={"lg"}
            >
              <Text
                textAlign={"center"}
                color={"#fc5310"}
                fontSize={"xl"}
                fontWeight={"bold"}
              >
                Lista Anunturi
              </Text>
              {anunturi && anunturi?.length !== 0 ? (
                anunturi.map((anunt) => (
                  <Flex
                    justify={"space-between"}
                    align={["left", "left", "left", "center"]}
                    flexDir={["column", "column", "column", "row"]}
                    p={4}
                    fontSize={"sm"}
                    borderBottom={"1px solid lightgray"}
                    gap={5}
                    color={"black"}
                    key={anunt.id}
                  >
                    <Stack>
                      <Text>
                        <b>Titlu:</b> {anunt.titlu}
                      </Text>
                      <Text>
                        <b>Continut:</b> {anunt.continut}
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
                            ? stergeAnunt(anunt.id)
                            : alert("Masterkey gresit")
                        }
                      >
                        {currentLoadingThrashCan == anunt.id ? (
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
                  Momentan nu exista niciun anunt in baza de date.
                </Text>
              )}
              <Text
                pt={3}
                color={"black"}
                fontWeight={"bold"}
              >
                Adauga Anunt Nou
              </Text>
              <HStack
                flexDir={["column"]}
                color={"black"}
              >
                <Input
                  value={titluAnuntNou}
                  onChange={(e) => setTitluAnuntNou(e.target.value)}
                  placeholder="nume anunt"
                />
                <Textarea
                  value={continutAnuntNou}
                  onChange={(e) => setContinutAnuntNou(e.target.value)}
                  placeholder="continut anunt"
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
                        isMaster ? adaugaAnunt() : alert("Masterkey gresit")
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
