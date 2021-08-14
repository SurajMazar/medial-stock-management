
<style>

  *{
    font-family:'Courier';
    font-size:12px;
  }

  .text-center{
    text-align: center;
  }

  .text-right{
    text-align: right;
  }

  p{
    margin: 0.5em 0;
  }

  span{
    font-weight: 500;
  }

  .title{
    font-size:18px;
    margin: 0.5em 0;
  }

  .sub-title{
    font-size: 14px;
    margin: 0.5em 0;
  }

  .row{
    display:flex;
    flex-wrap: wrap;
    width:100%;
  }

  .w-50{
    width: 50%;
  }
  .ml-auto{
    margin-left: auto;
  }
  .pt-2{
    padding-top:10px;
  }
  .table{
    border-collapse:collapse ;
    width: 100%;
  }
  
  .table thead th,.table tfoot td {
    border-bottom: 1px double #bcbcbc;
    border-top: 1px double #bcbcbc;
  }

  .table th , .table  td {
    font-size: 11px;
    text-align: left;
    vertical-align: middle;
    padding: 6px;
    white-space: normal;
  }
</style>
@yield('content')
