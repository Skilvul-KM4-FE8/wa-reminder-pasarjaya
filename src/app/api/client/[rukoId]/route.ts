import prisma from "../../../../../lib/prisma";
import { NextRequest } from "next/server";

// GET handler
export async function GET(_request: NextRequest, { params }: { params: { rukoId: string } }) {
  const { rukoId } = params;

  console.log("Received request for rukoId:", rukoId);

  try {
    if (!rukoId) {
      return new Response(JSON.stringify({ message: "Ruko ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ruko = await prisma.client.findUnique({
      where: { id: rukoId },
    });

    if (!ruko) {
      return new Response(JSON.stringify({ message: "Ruko not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(ruko), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching ruko data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE handler
export async function DELETE(_request: NextRequest, { params }: { params: { rukoId: string } }) {
  const { rukoId } = params;

  try {
    if (!rukoId) {
      return new Response(JSON.stringify({ message: "Ruko ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedRuko = await prisma.client.delete({
      where: { id: rukoId },
    });

    return new Response(JSON.stringify(deletedRuko), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting ruko data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PUT handler
export async function PUT(request: NextRequest, { params }: { params: { rukoId: string } }) {
  const { rukoId } = params;
  const {
    name,
    phone,
    address,
    contractDue,
    shopBlock,
    shopNumber,
    shopSize,
    pasarName,
  } = await request.json();

  try {
    if (
      !rukoId ||
      !name ||
      !phone ||
      !address ||
      !contractDue ||
      !shopBlock ||
      !shopNumber ||
      !shopSize ||
      !pasarName
    ) {
      return new Response(JSON.stringify({ message: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedRuko = await prisma.client.update({
      where: { id: rukoId },
      data: {
        name,
        phone,
        address,
        contractDue,
        shopBlock,
        shopNumber,
        shopSize,
        pasarName,
      },
    });

    return new Response(JSON.stringify(updatedRuko), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating ruko data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
