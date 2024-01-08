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
import VolumeSettings from "@/components/VolumeSettings";
import RegulamenteSettings from "@/components/RegulamenteSettings";
import useCPSStore from "@/store/useCPSStore";
import PremiiSettings from "@/components/PremiiSettings";
import AnunturiSettings from "@/components/AnunturiSettings";
import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
  const { isMaster, setIsMaster } = useCPSStore();
  const [masterkey, setMasterkey] = useState<string>("");

  useEffect(() => {
    if (masterkey === process.env.NEXT_PUBLIC_MASTERKEY) {
      setIsMaster(true);
    } else {
      setIsMaster(false);
    }
  }, [masterkey]);

  return (
    <Layout>
      <Center>
        <VStack
          width={["100%", "100%", "100%", "70%"]}
          spacing={4}
          mb={4}
        >
          {isMaster ? (
            <Text color={"green"}>Masterkey Corect</Text>
          ) : (
            <Text color={"red"}>Masterkey Gresit</Text>
          )}
          <Input
            bg={isMaster ? "green" : "white"}
            value={masterkey}
            onChange={(e) => setMasterkey(e.target.value)}
            color={"black"}
            placeholder="masterkey🔑"
            type="password"
          />
          <RegulamenteSettings />
          <VolumeSettings />
          <PremiiSettings />
          <AnunturiSettings />
        </VStack>
      </Center>
    </Layout>
  );
}
