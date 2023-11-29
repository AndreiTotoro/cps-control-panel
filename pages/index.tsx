import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Volum } from "@/types";

export default function Home() {
  const [volume, setVolume] = useState<Volum[] | "">("");

  const obtineVolume = async () => {
    const volume = await axios.get<Volum[]>("/api/obtine-volume");
    setVolume(volume.data);
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
                  gap={5}
                  color={"black"}
                  key={volum.id}
                >
                  <Text>{volum.titlu}</Text>
                  <Text>{volum.link}</Text>
                </Flex>
              ))
            ) : (
              <Text color={"black"}>
                Momentan nu este niciun volum in baza de date.
              </Text>
            )}
          </Stack>
        </VStack>
      </Center>
    </Layout>
  );
}
