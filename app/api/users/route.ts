import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/global";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import User from "@/database/user.model";
import { ValidationError } from "@/lib/http-errors";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create User

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const validationData = UserSchema.safeParse(body);

    if (!validationData.success) {
      throw new ValidationError(validationData.error.flatten().fieldErrors);
    }

    const { email, username } = validationData.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      throw new Error("Username is already taken.");
    }

    const newUser = new User(validationData.data);

    return NextResponse.json(
      { success: true, data: await newUser.save() },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
