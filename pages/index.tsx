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

export default function Home() {
  return (
    <Layout>
      <Stack
        spacing={4}
        mb={4}
      >
        <RegulamenteSettings />
        <VolumeSettings />
      </Stack>
    </Layout>
  );
}
