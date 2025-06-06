import prisma from "../../../../../lib/prisma";

export async function GET(request: Request, { params }: { params: { rukoId: string } }) {
  const { rukoId } = params;

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

export async function DELETE(request: Request, { params }: { params: { rukoId: string } }) {
  const { rukoId } = params;

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