import {
  ArrowLeftOutlined,
  DollarOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Result,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getInvoiceById } from "../../features/invoice/invoiceSlice";
import type { AppDispatch, RootState } from "../../store";
import { format } from "date-fns";

const { Title, Text } = Typography;

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { invoceDetail, loading } = useSelector(
    (state: RootState) => state.invoice
  );

  useEffect(() => {
    if (id) {
      dispatch(getInvoiceById(id));
    }
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "green";
      case "partial":
        return "orange";
      case "unpaid":
        return "red";
      default:
        return "blue";
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd.MM.yyyy");
  };

  if (loading) {
    return (
      <div className="text-center py-12 md:py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!invoceDetail || !invoceDetail.id) {
    return (
      <Result
        status="404"
        title={t("invoiceNotFound")}
        subTitle={t("invoiceNotFoundDesc")}
        extra={
          <Button type="default" onClick={handleGoBack}>
            {t("goBack")}
          </Button>
        }
      />
    );
  }

  return (
    <div className="w-full">
      <Row
        justify="space-between"
        align="middle"
        className="mb-4 md:mb-6"
        gutter={[16, 16]}
      >
        <Col xs={24} sm={16} md={18}>
          <Space className="flex-wrap">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
              type="text"
              size="large"
            >
              {t("back")}
            </Button>
            <Title level={2} className="!mb-0 text-lg md:text-xl lg:text-2xl">
              {t("invoiceDetails")}
            </Title>
          </Space>
        </Col>
        <Col xs={24} sm={8} md={6} className="text-left sm:text-right">
          <Tag color="blue" className="text-sm px-3 py-1">
            {invoceDetail.status?.toUpperCase()}
          </Tag>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <DollarOutlined />
            <span className="text-sm md:text-base">{t("invoiceSummary")}</span>
          </Space>
        }
        className="mb-4 md:mb-6"
      >
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={12} md={6}>
            <Text type="secondary" className="text-xs md:text-sm">
              {t("invoiceNumber")}
            </Text>
            <div>
              <Text strong className="text-sm md:text-base break-words">
                {invoceDetail.invoiceNumber}
              </Text>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Text type="secondary" className="text-xs md:text-sm">
              {t("totalAmount")}
            </Text>
            <div>
              <Text strong className="text-base md:text-lg text-blue-600">
                €{invoceDetail.taxInclusiveAmount}
              </Text>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Text type="secondary" className="text-xs md:text-sm">
              {t("issueDate")}
            </Text>
            <div>
              <Text strong className="text-sm md:text-base">
                {formatDate(invoceDetail.issueDate)}
              </Text>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <Text type="secondary" className="text-xs md:text-sm">
              {t("dueDate")}
            </Text>
            <div>
              <Text strong className="text-sm md:text-base">
                {formatDate(invoceDetail.dueDate)}
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} className="mb-4 md:mb-6">
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ShopOutlined />
                <span className="text-sm md:text-base">
                  {t("supplierInformation")}
                </span>
              </Space>
            }
            className="h-full"
          >
            <Descriptions
              column={1}
              size="small"
              className="responsive-descriptions"
            >
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">{t("companyName")}</span>
                }
              >
                <Text strong className="text-sm md:text-base break-words">
                  {invoceDetail.supplierName}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">{t("vatNumber")}</span>
                }
              >
                <span className="text-sm md:text-base">
                  {invoceDetail.supplierVat}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">{t("country")}</span>
                }
              >
                <span className="text-sm md:text-base">
                  {invoceDetail.supplierCountryCode}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">{t("endpoint")}</span>
                }
              >
                <span className="text-sm md:text-base break-all">
                  {invoceDetail.supplierEndpoint}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <UserOutlined />
                <span className="text-sm md:text-base">
                  {t("customerInformation")}
                </span>
              </Space>
            }
            className="h-full"
          >
            <Descriptions
              column={1}
              size="small"
              className="responsive-descriptions"
            >
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">
                    {t("customerName")}
                  </span>
                }
              >
                <Text strong className="text-sm md:text-base break-words">
                  {invoceDetail.customerName}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">{t("vatNumber")}</span>
                }
              >
                <span className="text-sm md:text-base">
                  {invoceDetail.customerVat}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">{t("country")}</span>
                }
              >
                <span className="text-sm md:text-base">
                  {invoceDetail.customerCountryCode}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">{t("endpoint")}</span>
                }
              >
                <span className="text-sm md:text-base break-all">
                  {invoceDetail.customerEndpoint || t("notAvailable")}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <DollarOutlined />
            <span className="text-sm md:text-base">
              {t("financialDetails")}
            </span>
          </Space>
        }
        className="mb-4 md:mb-6"
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Descriptions
              column={1}
              size="small"
              className="responsive-descriptions"
            >
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">
                    {t("lineExtensionAmount")}
                  </span>
                }
              >
                <span className="text-sm md:text-base">
                  €{invoceDetail.lineExtensionAmount}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">
                    {t("taxExclusiveAmount")}
                  </span>
                }
              >
                <span className="text-sm md:text-base">
                  €{invoceDetail.taxExclusiveAmount}
                </span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">
                    {t("taxInclusiveAmount")}
                  </span>
                }
              >
                <Text strong className="text-sm md:text-base text-blue-600">
                  €{invoceDetail.taxInclusiveAmount}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-xs md:text-sm">
                    {t("payableAmount")}
                  </span>
                }
              >
                <Text strong className="text-sm md:text-base text-green-600">
                  €{invoceDetail.payableAmount}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} md={12}>
            <Card
              size="small"
              title={
                <span className="text-sm md:text-base">
                  {t("paymentStatus")}
                </span>
              }
              className="h-full"
            >
              <Space direction="vertical" className="w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <Text type="secondary" className="text-xs md:text-sm">
                    {t("status")}:{" "}
                  </Text>
                  <Tag
                    color={getPaymentStatusColor(
                      invoceDetail.paymentDetails?.paymentStatus
                    )}
                    className="text-xs md:text-sm"
                  >
                    {invoceDetail.paymentDetails?.paymentStatus?.toUpperCase() ||
                      t("unknown")}
                  </Tag>
                </div>
                <Descriptions
                  column={1}
                  size="small"
                  className="responsive-descriptions"
                >
                  <Descriptions.Item
                    label={
                      <span className="text-xs md:text-sm">
                        {t("totalAmount")}
                      </span>
                    }
                  >
                    <span className="text-sm md:text-base">
                      €{invoceDetail.paymentDetails?.totalAmount || 0}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span className="text-xs md:text-sm">
                        {t("paidAmount")}
                      </span>
                    }
                  >
                    <span className="text-sm md:text-base">
                      €{invoceDetail.paymentDetails?.paidAmount || 0}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span className="text-xs md:text-sm">
                        {t("remainingAmount")}
                      </span>
                    }
                  >
                    <Text strong className="text-sm md:text-base text-red-600">
                      €{invoceDetail.paymentDetails?.remainingAmount || 0}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <span className="text-sm md:text-base">
            {t("additionalInformation")}
          </span>
        }
        className="mb-4 md:mb-6"
      >
        <Descriptions
          column={{ xs: 1, sm: 2, md: 3 }}
          size="small"
          className="responsive-descriptions"
        >
          <Descriptions.Item
            label={
              <span className="text-xs md:text-sm">{t("documentType")}</span>
            }
          >
            <span className="text-sm md:text-base">
              {invoceDetail.documentType}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className="text-xs md:text-sm">{t("type")}</span>}
          >
            <span className="text-sm md:text-base">{invoceDetail.type}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className="text-xs md:text-sm">{t("source")}</span>}
          >
            <span className="text-sm md:text-base">{invoceDetail.source}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={<span className="text-xs md:text-sm">{t("currency")}</span>}
          >
            <span className="text-sm md:text-base">
              {invoceDetail.currency}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="text-xs md:text-sm">{t("sendViaPeppol")}</span>
            }
          >
            <Tag
              color={invoceDetail.sendViaPeppol ? "green" : "red"}
              className="text-xs md:text-sm"
            >
              {invoceDetail.sendViaPeppol ? t("yes") : t("no")}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="text-xs md:text-sm">{t("createdDate")}</span>
            }
          >
            <span className="text-sm md:text-base">
              {formatDate(invoceDetail.createdTime)}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className="text-xs md:text-sm">{t("lastUpdated")}</span>
            }
          >
            <span className="text-sm md:text-base">
              {formatDate(invoceDetail.lastUpdatedTime)}
            </span>
          </Descriptions.Item>
          {invoceDetail.deliveryDate && (
            <Descriptions.Item
              label={
                <span className="text-xs md:text-sm">{t("deliveryDate")}</span>
              }
            >
              <span className="text-sm md:text-base">
                {formatDate(invoceDetail.deliveryDate)}
              </span>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
}
