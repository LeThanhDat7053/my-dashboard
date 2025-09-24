// src/pages/Media.tsx - Updated with custom header like Analytics
import React, { useState } from "react";
import "../styles/media.css";

import {
  Button,
  Card,
  Statistic,
  Tabs,
  Input,
  Select,
  Segmented,
  Upload,
  Row,
  Col,
  Modal,
  Table,
  Alert,
  Space,
  message,
} from "antd";
import {
  UploadOutlined,
  FolderAddOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
const { Dragger } = Upload;

interface MediaFile {
  key: string;
  name: string;
  type: "image" | "video" | "document";
  size: string;
  folder: string;
  preview?: string;
}

const initialMedia: MediaFile[] = [
  {
    key: "1",
    name: "deluxe-suite.jpg",
    type: "image",
    size: "2.4 MB",
    folder: "rooms",
    preview: "https://via.placeholder.com/300x200.png?text=Deluxe+Suite",
  },
  {
    key: "2",
    name: "pool-tour.mp4",
    type: "video",
    size: "8.7 MB",
    folder: "facilities",
  },
  {
    key: "3",
    name: "restaurant-menu.pdf",
    type: "document",
    size: "1.2 MB",
    folder: "documents",
  },
  {
    key: "4",
    name: "spa-treatment.jpg",
    type: "image",
    size: "3.1 MB",
    folder: "facilities",
    preview: "https://via.placeholder.com/300x200.png?text=Spa+Treatment",
  },
];

export default function Media() {
  const [media, setMedia] = useState<MediaFile[]>(initialMedia);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalFile, setModalFile] = useState<MediaFile | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredMedia = media.filter((file) => {
    if (activeTab === "all") return true;
    return file.type === activeTab;
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  const handleDelete = (record: MediaFile) => {
    Modal.confirm({
      title: `Delete ${record.name}?`,
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        setMedia((prev) => prev.filter((f) => f.key !== record.key));
        message.success(`${record.name} deleted`);
      },
    });
  };

  const uploadProps = {
    multiple: true,
    beforeUpload: (file: File) => {
      message.success(`${file.name} uploaded successfully (mock)`);
      return false;
    },
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "Folder", dataIndex: "folder", key: "folder" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: MediaFile) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => setModalFile(record)}
          />
          <Button
            size="small"
            icon={<DownloadOutlined />}
            onClick={() => message.info(`Downloading ${record.name}...`)}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="media-page">
      {/* Custom Header like Analytics */}
  

      <div className="media-header">
        <div>
          <h2 className="media-title">Media Library</h2>
          <div className="media-sub">
            Media 123
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Button icon={<FolderAddOutlined />}>
            New Folder
          </Button>
          <Button type="primary" icon={<UploadOutlined />}>
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={4}>
          <Card>
            <Statistic title="Total Files" value={media.length} />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Images"
              value={media.filter((f) => f.type === "image").length}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Videos"
              value={media.filter((f) => f.type === "video").length}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic
              title="Documents"
              value={media.filter((f) => f.type === "document").length}
            />
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ marginBottom: 24 }}>
        <TabPane tab={`All Files (${media.length})`} key="all" />
        <TabPane
          tab={`Images (${media.filter((f) => f.type === "image").length})`}
          key="image"
        />
        <TabPane
          tab={`Videos (${media.filter((f) => f.type === "video").length})`}
          key="video"
        />
        <TabPane
          tab={`Documents (${media.filter((f) => f.type === "document").length})`}
          key="document"
        />
      </Tabs>

      {/* Upload area */}
      <Dragger {...uploadProps} style={{ marginBottom: 24 }}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag files to upload</p>
        <p className="ant-upload-hint">
          Supported formats: JPG, PNG, MP4, PDF, DOCX (max 10MB per file)
        </p>
      </Dragger>

      {/* Controls */}
      <Space style={{ marginBottom: 24, flexWrap: "wrap" }}>
        <Search placeholder="Search media files..." style={{ width: 200 }} />
        <Select defaultValue="" style={{ width: 150 }}>
          <Option value="">All Folders</Option>
          <Option value="rooms">Room Photos</Option>
          <Option value="facilities">Facilities</Option>
          <Option value="food">Food & Beverage</Option>
          <Option value="documents">Documents</Option>
        </Select>
        <Segmented
          options={[
            { label: <FileImageOutlined />, value: "grid" },
            { label: <FileOutlined />, value: "list" },
          ]}
          value={view}
          onChange={(val) => setView(val as "grid" | "list")}
        />
      </Space>

      {/* Bulk Actions */}
      {selectedRowKeys.length > 0 && (
        <Alert
          message={`${selectedRowKeys.length} files selected`}
          type="info"
          action={
            <Space>
              <Button size="small" icon={<DownloadOutlined />}>
                Download
              </Button>
              <Button size="small" icon={<DeleteOutlined />} danger>
                Delete
              </Button>
            </Space>
          }
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Media content */}
      {view === "grid" ? (
        <Row gutter={[16, 16]}>
          {filteredMedia.map((file) => (
            <Col xs={24} sm={12} md={8} lg={6} key={file.key}>
              <Card
                hoverable
                cover={
                    file.type === "video" ? (
                            <div style={{ background: "#fff7f0", padding: 40, textAlign: "center" }}>
                            <VideoCameraOutlined style={{ fontSize: 40, color: "#fa8c16" }} />
                        </div>
                    ) : file.type === "document" ? (
                            <div style={{ background: "#fff0f6", padding: 40, textAlign: "center" }}>
                            <FilePdfOutlined style={{ fontSize: 40, color: "#eb2f96" }} />
                        </div>
                    ) : (
                            <div style={{ background: "#f0f9ff", padding: 40, textAlign: "center" }}>
                            <FileImageOutlined style={{ fontSize: 40, color: "#1890ff" }} />
                        </div>
                    )
                }
                actions={[
                  <EyeOutlined key="view" onClick={() => setModalFile(file)} />,
                  <DownloadOutlined
                    key="download"
                    onClick={() => message.info(`Downloading ${file.name}...`)}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDelete(file)}
                  />,
                ]}
              >
                <Card.Meta title={file.name} description={file.size} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredMedia}
          pagination={false}
        />
      )}

      {/* Modal preview */}
      <Modal
        open={!!modalFile}
        title={modalFile?.name}
        footer={null}
        onCancel={() => setModalFile(null)}
      >
        {modalFile?.type === "image" && modalFile.preview && (
          <img
            alt={modalFile.name}
            src={modalFile.preview}
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        )}
        {modalFile?.type === "video" && <p>Video preview not available in mock</p>}
        {modalFile?.type === "document" && (
          <p>Document preview not available in mock</p>
        )}
      </Modal>
    </div>
  );
}