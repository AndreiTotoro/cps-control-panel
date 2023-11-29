import { Box, Button, Center, Text } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [test, setTest] = useState("hi");

  const fetchTest = async () => {
    const data = await axios.get("/api/test");
    console.log(data.data);
    setTest(data.data[0].test);
  };

  return (
    <Layout>
      <Center>
        <Button onClick={() => fetchTest()}>Test DB connection</Button>
        <Text>{test}</Text>
      </Center>
    </Layout>
  );
}
