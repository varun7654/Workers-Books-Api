import { IRequest } from "itty-router";
import { Env } from "..";

export const CurrentlyReadingPageCounts = async (
  request: IRequest,
  env: Env
) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "text/html; charset=UTF-8",
  };
  const workId = request.query["workId"];
  const percent = request.query["percent"];
  const totalPages = request.query["totalPages"];

  if (!workId || !percent || !totalPages) {
    return new Response("Missing required params", { status: 400, headers });
  }
  await env.BOOKS.put(workId + "progress", JSON.stringify({ percent, totalPages }));

	const returnJson = JSON.stringify({ workId, percent, totalPages });

  var body =
    '<meta http-equiv="refresh" content="0; URL=https://dacubeking.com/readingedit/updateProgress?overrideJson=' +
    encodeURIComponent(returnJson) +
    '" />';
  return new Response(body, { headers });
};
