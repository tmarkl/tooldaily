"use client";

import { useEffect, useState } from "react";
import { getIsMobile, nameSourceOptions } from "../utils";
import { Button, Card, Col, Form, Input, Radio, Row } from "antd";
import { useSwrGetData } from "../swr";

export type DataType = {
  title: string;
  author: string;
  book: string;
  dynasty: string;
  content: string;
  name: string;
  sentence: string;
  sentenceHtml: string;
};
const key = "/api/v1/names";

export default function Name() {
  const [form] = Form.useForm();
  const [buttonText, setButtonText] = useState("取名");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [swrKey, setSwrKey] = useState<null | any[]>(null);

  const { data, isLoading } = useSwrGetData(swrKey, {
    onSuccess: () => {
      setButtonText("换一批");
    },
  });

  useEffect(() => {
    setIsMobile(!!getIsMobile());
  }, []);

  const submit = async () => {
    const { type, lastName } = await form.validateFields();
    const timestamp = Date.now();
    setSwrKey([key, { source: type, xing: lastName, timestamp }]);
  };

  return (
    <div
      className="min-h-screen  pt-[20px] "
      style={{
        background:
          "linear-gradient(334deg, #46a0ff, #a1abe0, #d5b7c0, #ffc49f)",
      }}
    >
      <div className="flex flex-col justify-center items-center max-w-custom mx-auto p-4">
        <div className="flex flex-col justify-center items-center w-full sm:w-[600px]">
          <Form
            form={form}
            initialValues={{ type: 5 }}
            onValuesChange={() => {
              setButtonText("取名");
            }}
          >
            <Form.Item name="type" className="w-[300px] sm:w-[512px]">
              <Radio.Group
                optionType={!isMobile ? "button" : "default"}
                buttonStyle="solid"
                options={nameSourceOptions}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              className="w-[300px] sm:w-[512px]"
              rules={[{ message: "请先输入您的姓氏", required: true }]}
            >
              <Input size="large" placeholder="请输入您的姓氏,如：张" />
            </Form.Item>
            <Button
              size="large"
              type="primary"
              className="w-[300px] sm:w-[512px]"
              onClick={submit}
              loading={isLoading}
            >
              {buttonText}
            </Button>
          </Form>
        </div>

        <Row gutter={[16, 16]} className="w-full mt-[80px]">
          {data?.data?.map((item: any) => (
            <Col span={isMobile ? 24 : 8} key={item.name}>
              <Card
                hoverable
                style={{
                  background:
                    "linear-gradient(25deg, #46a0ff, #a1abe0, #d5b7c0, #ffc49f)",
                }}
              >
                <div className="flex text-[30px] font-bold justify-center text-white">
                  {item.name}
                </div>
                <div className="m mt-[20px] text-[16px]  text-white">
                  {item.source}
                </div>
                <div className="flex justify-between mt-4  text-white">
                  <div>{item.title}</div>
                  <div className="whitespace-nowrap pl-2">
                    {item.author || "佚名"}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
