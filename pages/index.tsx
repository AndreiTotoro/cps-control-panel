import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
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

  const obtineVolume = async () => {
    const volume = await axios.get<Volum[]>("/api/get/volume", {
      headers: {
        "security-phrase": process.env.NEXT_PUBLIC_SECURITY_PHRASE,
      },
    });
    setVolume(volume.data);
  };

  const adaugaVolum = async () => {
    const volum = await axios.post<Volum>("/api/post/volum", {
      titlu: titluVolumNou,
      link: linkVolumNou,
    });
    setTitluVolumNou("");
    setLinkVolumNou("");
    obtineVolume();
  };

  const stergeVolum = async (id: string) => {
    const volum = await axios.delete<Volum>("/api/delete/volum", {
      data: {
        id,
      },
    });
    console.log(volum);
    obtineVolume();
  };

  useEffect(() => {
    obtineVolume();
  }, []);

  return (
    <Layout>
      <Center>
        <VStack>
          <Stack
            bg={"white"}
            p={5}
            rounded={"lg"}
          >
            <Text
              color={"black"}
              fontWeight={"bold"}
            >
              Volume
            </Text>
            {volume ? (
              volume.map((volum) => (
                <Flex
                  align={"center"}
                  gap={5}
                  color={"black"}
                  key={volum.id}
                >
                  <Text>{volum.titlu}</Text>
                  <Text>{volum.link}</Text>
                  <Box
                    _hover={{ cursor: "pointer" }}
                    color={"red"}
                    onClick={() => stergeVolum(volum.id)}
                  >
                    <FiTrash />
                  </Box>
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
            <HStack color={"black"}>
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
              <Button
                onClick={() => adaugaVolum()}
                px={6}
              >
                Adauga
              </Button>
            </HStack>
          </Stack>
        </VStack>
      </Center>
    </Layout>
  );
}
