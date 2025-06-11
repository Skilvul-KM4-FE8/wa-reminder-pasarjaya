import prisma from "../../../../../lib/prisma";

export async function GET(request: Request, context: { params: { rukoId: string } }) {
  const { rukoId } = context.params;

  console.log("Received request for rukoId:", rukoId);
  console.log("Request headers:", request.headers.get("Content-Type"));
  console.log("Request method:", request.method);

  try {
    // Validate rukoId
    if (!rukoId) {
      return new Response(JSON.stringify({ message: "Ruko ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the ruko data from the database
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

export async function DELETE(_request: Request, context: { params: { rukoId: string } }) {
  const { rukoId } = context.params;

  // console.log("Received request to delete rukoId:", rukoId);
  // console.log("Request headers:", request.headers.get("Content-Type"));
  // console.log("Request method:", request.method);

  try {
    // Validate rukoId
    if (!rukoId) {
      return new Response(JSON.stringify({ message: "Ruko ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the ruko from the database
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

export async function PUT(request: Request, context: { params: { rukoId: string } }) {
  const { rukoId } = context.params;
  const { name, phone, address, contractDue, shopBlock, shopNumber, shopSize, pasarName } = await request.json();

  // console.log("Received request body:", request.body);
  // console.log("Received request headers:", request.headers.get("Content-Type"));
  // console.log("Received request method:", request.method);

  try {
    // Validate required fields
    if (!rukoId || !name || !phone || !address || !contractDue || !shopBlock || !shopNumber || !shopSize || !pasarName) {
      return new Response(JSON.stringify({ message: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the ruko in the database
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
