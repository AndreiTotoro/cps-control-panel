import useCPSStore from "@/store/useCPSStore";
import { Volum } from "@/types";
import { UploadButton } from "@/utils/uploadthing";
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

export default function VolumeSettings() {
  const { isMaster } = useCPSStore();
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [volume, setVolume] = useState<Volum[] | "">("");
  const [titluVolumNou, setTitluVolumNou] = useState<string>("");
  const [linkVolumNou, setLinkVolumNou] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentLoadingThrashCan, setCurrentLoadingThrashCan] =
    useState<string>("");

  const obtineVolume = async () => {
    const volume = await axios.get<Volum[]>("/api/get/volume");
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
              Editare Volume
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
                Lista Volume
              </Text>
              {volume?.length !== 0 && volume ? (
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
                        onClick={() =>
                          isMaster
                            ? stergeVolum(volum.id)
                            : alert("Masterkey Gresit")
                        }
                      >
                        {currentLoadingThrashCan == volum.id ? (
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
                align={"baseline"}
                flexDir={["column", "column", "column", "row"]}
                color={"black"}
              >
                <Input
                  value={titluVolumNou}
                  onChange={(e) => setTitluVolumNou(e.target.value)}
                  placeholder="nume volum"
                />
                {isFileUploaded ? (
                  <Text>File uploaded</Text>
                ) : (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      setLinkVolumNou(res[0].url);
                      setIsFileUploaded(true);
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                )}
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
                        isMaster ? adaugaVolum() : alert("Masterkey Gresit")
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
