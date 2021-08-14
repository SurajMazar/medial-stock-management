

@extends('pdf.layout')


@section('content')
<div class="container">
  <div class="row">
    @if(isset($data->vendor))
      <div class="col-md-12 text-center">
        {{-- <img src="{{asset('logo.png')}}" alt="" class="img-fluid"> --}}
        <h2 class="title">
          {{$data->vendor->name?:""}}
        </h2>
      </div>
    @endif
  </div>
  <div class="row pt-2">
    <div class="w-50">
      @if(isset($data->vendor))
      <p><span>Pan: </span>{{$data->vendor->pan_vat?:""}}</p>
      <p>{{$data->vendor->address?:""}}</p>
      <p><span>Phone: </span>{{$data->vendor->pan_vat?:""}}</p>
      @endif 
    </div>
    <div class="w-50 ml-auto">
      <p class="text-right"><span>Invoice No: </span>{{$data->invoice_number?:""}}</p>
      <p class="text-right"><span>Transaction Date: </span>{{$data->transaction_date?date('F j, Y',strtotime($data->transaction_date)):""}}</p>
      <p class="text-right"><span>Invoice Issue Date: </span>{{$data->invoice_issue_date?date('F j, Y',strtotime($data->invoice_issue_date)):""}}</p>
    </div>
  </div>
  
  <div class="row">
    <h3 class="title text-center">
      Invoice
    </h3>
  </div>

  <div>
    <table class="table">
      <thead>
        <tr>
          <th>SN</th>
          <th>Code</th>
          <th>Item</th>
          <th>Pack</th>
          <th>Batch</th>
          <th>Exp.Date</th>
          <th>Qty</th>
          <th>CC/Rate</th>
          <th>Amount</th>
          <th>MRP</th>
        </tr>
      </thead>
      <tbody>
        @if(isset($data->purchases) && count($data->purchases)>0)
          @foreach ($data->purchases as $key=> $p)
            <tr>
              <td>{{$key+1}}</td>
              <td>{{$p->code}}</td>
              <td>{{$p->product->name}}</td>
              <td>{{$p->pack}}</td>
              <td>{{$p->batch}}</td>
              <td>{{$p->expiry_date?date('F j, Y',strtotime($p->expiry_date)):""}}</td>
              <td>{{$p->quantity}} 
                @if($p->free)
                  free
                @endif
              </td>
              <td>
                @if($p->free)
                  {{$p->free_rate}} ({{$p->free_rate_type}})
                @else
                 {{$p->rate}}
                @endif
              </td>
              <td>{{$p->amount}}</td>
              <td>{{$p->marked_price}}</td>
            </tr>
          @endforeach
        @else
          <tr>
            <td colspan="10" class="text-center">Sorry no items were purchased </td>
          </tr>
        @endif
      </tbody>
      <tfoot>
        <tr>
          <td colspan="8" class="text-center">
            Total
          </td>
          <td>
            @if(isset($data->purchases) && count($data->purchases)>0)
              @php
                $total = 0;
                foreach($data->purchases as $p){
                  $total = $total+ $p->amount;
                }
                echo $total;
              @endphp
              @else
              0
            @endif
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>

  <div class="row">
    <div class="w-50 ml-auto">
      <table class="table">
        <tbody>
          @if(isset($data->alterations) && count($data->alterations)>0)
            @foreach ($data->alterations as $a)
              <tr>
                <td>{{$a->name}}</td>
                <td>{{$a->operation === "sub"?'-':"+"}} {{$a->amount}}</td>
              </tr>
            @endforeach
          @endif
        </tbody>
        <tfoot>
          <tr>
            <td>Grand total</td>
            <td>{{$data->total}}</td>
          </tr>
        </tfoot>
      </table>
      @if($data->total_in_words)
      <p class="pt-2">In words - {{$data->total_in_words}}</p>
      @endif
    </div>
  </div>

  <div class="row pt-2">
   @if(isset($data->note))
   Note:{{$data->note}}
   @endif
  </div>
</div>
@endsection