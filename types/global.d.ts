import { NextResponse } from "next/server";

interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

type ActionRespone<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, String>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionRespone<T> & {
  success: true;
};

type ErrorResponse = ActionRespone<undefined> & {
  success: false;
};

type APIErrorResponse = NextResponse<ErrorResponse>;

type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
