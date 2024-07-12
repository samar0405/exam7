import React, { useState } from "react";
import { Modal, Upload, Button, Typography, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import http from "../../../service/config";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      setLoading(false);
      console.log(info.file.originFileObj);
      const file = new FormData();
      file.append("file", info.file.originFileObj);
      http.post(`media/upload-photo?id=${id}`, file);
    }
  };
  const handleAddImg = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await media.upload(product.product_id, formData);
      if (response.status === 200 && response?.data?.image_url) {
        toast.success("Image uploaded successfully!");
        getData(product.product_id);
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    customRequest: ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
    onChange: handleChange,
  };

  return (
    <>
      <AddPhotoAlternateRoundedIcon
        onClick={handleOpen}
        className="text-blue-400 cursor-pointer"
        style={{ fontSize: 30 }}
      />

      <Modal
        title="Upload Photo"
        visible={open}
        onCancel={handleClose}
        footer={[
          <Button key="close" onClick={handleClose}>
            Close
          </Button>,
        ]}
        bodyStyle={{ textAlign: "center" }}
        width={600}
      >
        <Typography>
          <Upload {...uploadProps}>
            <Button
              onClick={handleAddImg}
              icon={loading ? <Spin /> : <UploadOutlined />}
              disabled={loading}
            >
              {loading ? "Uploading" : "Click to Upload Product Image"}
            </Button>
          </Upload>
        </Typography>
      </Modal>
    </>
  );
};

export default Index;

