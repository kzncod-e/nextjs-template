import { connect } from "amqplib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "taskId required" }, { status: 400 });
  }

const connection = await connect("amqp://guest:guest@localhost:5672/");
  const channel = await connection.createChannel();

  await channel.assertQueue("ai_results");

  // ambil message sekali
  const msg = await channel.get("ai_results", { noAck: false });
console.log(msg,">>>>>>>>>>>>>ini msg di route");

  if (!msg) {
    // tidak ada message sama sekali
    return NextResponse.json({ status: "pending", result: null });
  }

  const { taskId: msgTaskId, result } = JSON.parse(msg.content.toString());

  if (msgTaskId === taskId) {
    // message cocok → ack & return
    channel.ack(msg);

    return NextResponse.json({
      status: "done",
      result,
    });
  }

  // message bukan buat kita → jangan ack → biarkan di queue
  channel.nack(msg, false, true);

  return NextResponse.json({ status: "pending", result: null });
}
