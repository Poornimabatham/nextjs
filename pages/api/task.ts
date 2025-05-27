// import type { NextApiRequest, NextApiResponse } from "next";
// import { supabase } from "@/lib/supabase";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session?.user?.email) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const { data: userData, error: userError } = await supabase
//     .from("users")
//     .select("id")
//     .eq("email", session.user.email)
//     .single();

//   if (userError || !userData) {
//     return res.status(400).json({ error: "User not found" });
//   }

//   const userId = userData.id;

//   if (req.method === "POST") {
//     const { title, description, dueDate, priority, status } = req.body;

//     const { data, error } = await supabase.from("tasks").insert([
//       {
//         title,
//         description,
//         due_date: dueDate,
//         priority,
//         status,
//         created_by: userId,
//       },
//     ]);

//     if (error) return res.status(400).json({ error: error.message });

//     return res.status(201).json(data);
//   }

//   res.status(405).end();
// }


