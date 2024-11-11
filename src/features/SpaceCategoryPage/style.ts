import styled from 'styled-components';

const TableButtonStyle = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
  padding-right: ${({ theme }) => theme.spacing.md};
`;

const SpaceCategoryStyled = styled.div`
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    p {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: bold;
    }
  }

  /* .register {
    margin: ${({ theme }) => theme.spacing.md};
    margin-left: 0;
  } */

  /* table */
  .ant-table-thead > tr > th:last-of-type {
    text-align: right;
    padding-right: 180px;
  }
  /* 대분류 */
  .ant-table-row {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: bold;
  }
  /* 확장된 소분류 항목 */
  .ant-table-expanded-row {
    background-color: #fafafa;
    padding: 10px 15px;
    border: 1px solid #e1e1e1;
    margin: 10px 0;
  }
`;

const CategoryStyle = styled.div`
  .category-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid #e1e1e1;
  }

  .category-name {
    padding-left: 50px;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

export { CategoryStyle, SpaceCategoryStyled, TableButtonStyle };
